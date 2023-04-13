import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import openAi from "~/lib/open-ai";

export const recipeRouter = createTRPCRouter({
  generateIngredientsRecipe: publicProcedure
    .input(
      z.object({
        ingredients: z
          .array(z.string().min(1).max(30))
          .min(3, { message: "Please provide atleast 3 ingredients" }),
      })
    )
    .mutation(async ({ input }) => {
      //get ingredients
      const ingredients = input.ingredients.join(", ");
      //make api call to openai for generating a meal based on the ingredients including step by step guide
      /* const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `generate me a recipe from these ingredients: "noodles, eggs, chicken, pepper" please include a title,  ingredients list, description, prep, cook,  total time, Number of instruction steps, step by step instruction each step begins with Step number`,
          },
        ],
        temperature: 6,
        max_tokens: 3799,
      });
      console.log(response.data.choices[0]?.message); */
      //format meal including steps, prep-time, cook-time, total-time, title, description
      const response =
        "Title: Lentil and Chicken Spinach Salad with Tomato Dressing Description: This lentil and chicken spinach salad is packed with protein, fiber, and nutrients. The tomato dressing adds a refreshing touch to the dish. Prep Time: 20 minutes Cook Time: 15 minutes Total Time: 25 minutes Ingredients: 1 cup of cooked lentils 1 cup of cooked chicken breast, sliced 2 cups of fresh spinach leaves 1 cup of cherry tomatoes, halved For the tomato dressing: 1 large tomato, chopped 2 tablespoons of olive oil 1 tablespoon of balsamic vinegar Salt and pepper to taste Instructions: Step 1: Rinse the cooked lentils with cold water and drain them. Set aside. Step 2: In a small bowl, mix together the olive oil, balsamic vinegar, chopped tomato, salt, and pepper. Set aside. Step 3: In a large bowl, add the fresh spinach leaves, sliced chicken breast, and cherry tomatoes. Number of instruction steps: 3.";

      const title = response.split("Title:")[1].split("Description:")[0];
      console.log(title);
      const description = response
        .split("Description:")[1]
        .split("Prep Time")[0];
      console.log(description);
      const prepTime = response
        .split("Prep Time:")[1]
        .split("Cook Time:")[0]
        .trim();
      console.log("Prep Time: ", prepTime);

      const cookTime = response
        .split("Cook Time:")[1]
        .split("Total Time:")[0]
        .trim();
      console.log("Cook Time: ", cookTime);
      const totalTime = response
        .split("Total Time:")[1]
        .split("Ingredients:")[0]
        .trim();
      console.log("Total Time: ", totalTime);
      const stepsCounter = parseInt(
        response.split("Number of instruction steps:")[1].split(".")[0].trim()
      );
      const steps = response
        .split("Instructions:")[1]
        .split("Number of instruction steps:")[0]
        .trim();
      const stepsList = [];
      for (let index = 1; index < stepsCounter + 1; index++) {
        const step = steps
          .split(`Step ${index}:`)[1]
          .split(`Step ${index + 1 > stepsCounter ? index : index + 1}:`)[0]
          .trim();
        stepsList.push(step);
      }

      console.log(stepsList);

      //generate image for recipe image
      const recipeImage = await openAi.createImage({
        prompt: title,
        n: 1,
        size: "512×512",
      });
      const recipeImageUrl = recipeImage.data.data[0].url;
      console.log(recipeImageUrl);
      //generate images for each step
      /* const stepsImages = generateStepImages */
      //upload images to a hosting provider
      //add recipe to user and db including the steps
      return {
        ingredients: "Meal generated",
      };
    }),
});
