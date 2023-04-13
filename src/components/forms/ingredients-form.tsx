import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import * as Form from "@radix-ui/react-form";
import { api } from "~/utils/api";

const ingredientsFormSchema = z.object({
  ingredient: z.string().max(30),
  ingredients: z
    .array(z.string().min(1).max(30))
    .min(3, { message: "Please provide atleast 3 ingredients" }),
});

type TIngredientsForm = z.infer<typeof ingredientsFormSchema>;

const IngredientsForm = () => {
  const addRecipe = api.recipe.generateIngredientsRecipe.useMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TIngredientsForm>({
    resolver: zodResolver(ingredientsFormSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const watchIngredient = watch("ingredient");
  const watchIngredients = watch("ingredients");

  const onSubmit = (data) =>
    addRecipe.mutate(
      { ingredients: data.ingredients },
      {
        onSuccess(data) {
          console.log(data);
        },
      }
    );

  return (
    <Form.Root asChild>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center"
      >
        <Form.Field className="mb-[10px] grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Ingredient
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input {...register("ingredient")} />
          </Form.Control>
          <Form.Message
            asChild
            className="text-[13px] text-white opacity-[0.8]"
          >
            <span>{errors.ingredients?.message}</span>
          </Form.Message>
        </Form.Field>
        <button
          type="button"
          onClick={() => {
            append(watchIngredient);
          }}
        >
          Add Ingredient
        </button>
        <ul>
          {watchIngredients &&
            watchIngredients.map((ingredient, index) => (
              <li
                key={index}
                onClick={() => {
                  remove(index);
                }}
              >
                {ingredient}
              </li>
            ))}
        </ul>

        <Form.Submit asChild>
          <button type="submit">Get Meal</button>
        </Form.Submit>
      </form>
    </Form.Root>
  );
};

export default IngredientsForm;
