import { ExampleModel } from "../models/exampleModel";

export async function fetchExampleData(): Promise<ExampleModel[]> {
  // Example logic to fetch data from a database or external service
  const data: ExampleModel[] = [
    { id: 1, name: "Example 1" },
    { id: 2, name: "Example 2" },
  ];
  return data;
}
