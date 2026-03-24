import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const PORT = 5000;

const DATA_URL =
  "https://raw.githubusercontent.com/HDRUK/hackathon-entity-linkage/refs/heads/dev/fe-implement/app/data/all_datasets.json";


type RawDataset = {
  metadata?: {
    summary?: {
      title?: string;
      description?: string;
    };
    accessibility?: {
      access?: {
        accessServiceCategory?: string;
        accessRights?: string;
      };
    };
  };
};

app.get("/datasets", async (req, res) => {
  try {
    const response = await fetch(DATA_URL);
    const json = (await response.json()) as RawDataset[];
    
    const datasets = json.map((item) => {
      const summary = item.metadata?.summary ?? {};
      const access = item.metadata?.accessibility?.access ?? {};

      return {
        title: summary.title ?? "N/A",
        description: summary.description ?? "No description",
        accessServiceCategory: access.accessServiceCategory ?? "N/A",
        accessRights: access.accessRights ?? "#",
      };
    });

    res.json(datasets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});