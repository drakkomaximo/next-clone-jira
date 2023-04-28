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
      createdAt: 1682683096395,
      description: "Descripcion 1",
      status: "pending",
    },
    {
      createdAt: 1682683096396,
      description: "Descripcion 2",
      status: "finished",
    },
    {
      createdAt: 1682683096397,
      description: "Descripcion 3",
      status: "in-progress",
    },
  ],
};
