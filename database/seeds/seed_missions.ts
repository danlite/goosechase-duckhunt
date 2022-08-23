import { Knex } from "knex";
import { faker } from "@faker-js/faker";

const randomType = () => {
  const types = ["text", "photo", "location"];
  return types[Math.floor(Math.random() * types.length)];
};

const randomPoints = () => {
  const values = [100, 100, 100, 200, 200, 400, 1000];
  return values[Math.floor(Math.random() * values.length)];
};

type Content = { name: string; description: string };

const randomPhotoContent = (): Content => {
  const contents: Array<() => Content> = [
    () => {
      const verb = faker.hacker.ingverb();
      const noun = faker.hacker.noun();
      const adjective = faker.hacker.adjective();
      const name = `${adjective} ${verb}`.replace(/(^\w)|(\s\w)/g, (match) =>
        match.toUpperCase()
      );
      return {
        name,
        description: `Take a photo of your team ${verb} the nearest ${noun}.`,
      };
    },
  ];
  return contents[Math.floor(Math.random() * contents.length)]();
};

const randomLocationContent = (): Content => {
  const contents: Array<() => Content> = [
    () => {
      const street1 = faker.address.street();
      const street2 = faker.address.street();
      return {
        name: `${street1} Corner Score`,
        description: `Go to the corner of ${street1} and ${street2} for a big score!`,
      };
    },
    () => {
      const country = faker.address.country();
      return {
        name: `${country}, just a quick trip`,
        description: `Check in at the international airport in ${country}. Shouldn't take too long, right?`,
      };
    },
  ];
  return contents[Math.floor(Math.random() * contents.length)]();
};

const randomTextContent = (): Content => {
  const contents: Array<() => Content> = [
    () => {
      const product = faker.commerce.productName();
      return {
        name: product,
        description: `Come up with a product description for ACME's new product: ${product}. It should be at least 100 words long.`,
      };
    },
    () => {
      const colour = faker.color.human();
      return {
        name: `Roses are... ${colour}?!`,
        description: `Write a love poem about the colour ${colour}. It's going to be a pretty special one.`,
      };
    },
  ];
  return contents[Math.floor(Math.random() * contents.length)]();
};

export async function seed(knex: Knex): Promise<void> {
  await knex("missions").del();
  const missions = [];
  for (let i = 0; i < 12; i++) {
    const type = randomType();
    const points = randomPoints();
    const content =
      type === "photo"
        ? randomPhotoContent()
        : type === "location"
        ? randomLocationContent()
        : randomTextContent();
    missions.push({ type, points, ...content });
  }
  await knex("missions").insert(missions);
}
