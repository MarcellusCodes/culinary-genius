import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Tabs from "@radix-ui/react-tabs";
import { IngredientsForm } from "~/forms/index";

import { api } from "~/utils/api";

const GenerateRecipe: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>CulinaryGenius</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="grid h-screen w-full place-items-center bg-primary">
        <div className="relative z-10 flex flex-col items-center justify-center gap-12">
          <h1 className="text-center text-6xl font-bold text-secondary">
            Generating Recipe
          </h1>
          <p className="text-center text-xl text-secondary text-opacity-80">
            choose between our options
          </p>
          <Tabs.Root className=" flex  flex-col" defaultValue="ingredients">
            <Tabs.List
              className=" flex shrink-0 items-center gap-6 border-b border-secondary"
              aria-label="Manage your account"
            >
              <Tabs.Trigger className="" value="ingredients">
                Ingredients
              </Tabs.Trigger>
              <Tabs.Trigger className="" value="random-meal">
                Random Meal
              </Tabs.Trigger>
              <Tabs.Trigger className="" value="search">
                Search
              </Tabs.Trigger>
              <Tabs.Trigger className="" value="image">
                Image
              </Tabs.Trigger>
              <Tabs.Trigger className="" value="your-own">
                Your Own
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="" value="ingredients">
              <IngredientsForm />
            </Tabs.Content>
            <Tabs.Content className=" " value="random-meal">
              <p className="text-black">random meal</p>
            </Tabs.Content>
            <Tabs.Content className=" " value="search">
              <p className="text-black">Search</p>
            </Tabs.Content>
            <Tabs.Content className="" value="image">
              <p className="">Image</p>
            </Tabs.Content>
            <Tabs.Content className="" value="your-own">
              <p className="">Your Own</p>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </header>
    </>
  );
};

export default GenerateRecipe;
