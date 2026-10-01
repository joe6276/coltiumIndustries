# Homepage rollback checkpoint

Baseline commit: `4b3491d` (pushed to `main`).
Rollback tag: `homepage-before-scroll-2026-10-01`.

The `.txt` files preserve exact copies of the hero, global CSS, and homepage
composition before the scroll mosaic implementation.

To undo only the scroll mosaic while keeping the widened public layout:

```bash
git restore --source=homepage-before-scroll-2026-10-01 -- src/components/home/Hero.tsx src/app/globals.css
```

Review any later edits to those files before restoring them. Commit the restored
files normally if a published rollback is needed; do not reset shared history.
