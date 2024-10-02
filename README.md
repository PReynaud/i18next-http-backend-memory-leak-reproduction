# Reproduction of a memory leak 

```bash
pnpm i
pnpm run build
pnpm run preview:inspect
```

Launch multiple request on `http://localhost:3001` and see the memory of the server increase