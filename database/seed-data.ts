interface seedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  createdAt: number;
  description: string;
  status: string;
}

export const seedData : seedData = {
  entries: [
    {
      createdAt: 1001,
      description: "Descripcion 1",
      status: "pending",
    },
    {
      createdAt: 1002,
      description: "Descripcion 2",
      status: "finished",
    },
    {
      createdAt: 1003,
      description: "Descripcion 3",
      status: "in-progress",
    },
  ],
};
