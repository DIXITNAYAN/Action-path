import { Router, type IRouter } from "express";
import {
  ListActionsQueryParams,
  GetActionParams,
  GetRecommendationsBody,
} from "@workspace/api-zod";
import {
  getActions,
  getActionById,
  getCategorySummaries,
  getFeatured,
  getStats,
  recommend,
  stripCondition,
} from "../data/actions";

const router: IRouter = Router();

router.get("/actions", (req, res) => {
  const parsed = ListActionsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_query", details: parsed.error.issues });
    return;
  }
  const items = getActions({
    category: parsed.data.category,
    search: parsed.data.search,
  }).map(stripCondition);
  res.json({ items, total: items.length });
});

router.get("/actions/:id", (req, res) => {
  const parsed = GetActionParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_params" });
    return;
  }
  const action = getActionById(parsed.data.id);
  if (!action) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.json(stripCondition(action));
});

router.get("/categories", (_req, res) => {
  res.json(getCategorySummaries());
});

router.get("/featured", (_req, res) => {
  const items = getFeatured().map(stripCondition);
  res.json({ items, total: items.length });
});

router.get("/stats", (_req, res) => {
  res.json(getStats());
});

router.post("/recommendations", (req, res) => {
  const parsed = GetRecommendationsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_body", details: parsed.error.issues });
    return;
  }
  const items = recommend(parsed.data).map(stripCondition);
  res.json({ items, total: items.length });
});

export default router;
