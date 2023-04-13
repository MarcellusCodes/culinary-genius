import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import openAi from "~/lib/open-ai";

function removeNewlines(str: string) {
  return str.replace(/\n\n?/g, "");
}

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
      const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "generate me a recipe from these ingredients: noodles, eggs, chicken, pepper please include a title, ingredients list, description, prep, cook, total time, number of instruction steps, step by step instruction each step begins with Step number",
          },
        ],
        temperature: 0.2,
        max_tokens: 3799,
      });

      //format meal including steps, prep-time, cook-time, total-time, title, description

      const title = response.data.choices[0]?.message.content
        .split("Title:")[1]
        .split("Description:")[0];
      console.log(title);
      const description = response.data.choices[0]?.message.content
        .split("Description:")[1]
        .split("Prep Time")[0];
      console.log(description);
      const prepTime = response.data.choices[0]?.message.content
        .split("Prep Time:")[1]
        .split("Cook Time:")[0]
        .trim();
      console.log("Prep Time: ", prepTime);

      const cookTime = response.data.choices[0]?.message.content
        .split("Cook Time:")[1]
        .split("Total Time:")[0]
        .trim();
      console.log("Cook Time: ", cookTime);
      const totalTime = response.data.choices[0]?.message.content
        .split("Total Time:")[1]
        .split("Ingredients:")[0]
        .trim();
      console.log("Total Time: ", totalTime);
      const stepsCounter = parseInt(
        response.data.choices[0]?.message.content
          .split("Number of instruction steps:")[1]
          .split(".")[0]
          .trim()
      );
      const steps = response.data.choices[0]?.message.content
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
      /*const recipeImage = await openAi.createImage({
        prompt: title,
        n: 1,
        size: "512×512",
      });
      const recipeImageUrl = recipeImage.data.data[0].url;
      console.log(recipeImageUrl); */
      //generate images for each step
      /* const stepsImages = generateStepImages */
      //upload images to a hosting provider
      //add recipe to user and db including the steps
      return {
        ingredients: "Generated meal",
      };
    }),
});
