# Readme for `stack-task`
Task for interview

## Installation

### Locally
Run `npm run dev` locally to start the NextJS server

## Deployment

The project is live on Vercel, at: `https://stack-task-ten.vercel.app/`


## Project structure

### Authentication
To check if the user is authenticated (server side) call `checkAuthorization()`:

```tsx
export default async function Page() {
  await checkAuthorization();

  // user is authenticated

  return (<>Hello!</>)
}
```

### Main sections

#### `app`
All the files (server side pages) from NextJS

#### `assets`
This folder contains the assets that are used in components (images, icons, logos...)

Remember to export every file as a named export with corresponding prefixes. For example, all the files in the `icons` directory
should be exported like
```ts
export * as iconFolderOpen from "./folder-open.svg";
```

This allows Intellisense to import them when partially typing them
```html
<Image src={iconFolderOpen} />
```

#### `components`
The library of components (reusable client-side code)
##### `components/ui`
Shadcdn UI components
##### `components/library`
Custom components

#### `context`
All of the `React Context` definitions, and its "wrappers" (i.e. Context Providers)
> ℹ️  Use `xxxx.context.ts` for naming

Add all of the constants, column definitions, size definitions, and so on.
Remember not to add any sensitive information (that belongs to the `.env` files!)

> ℹ️  Use `xxxx.definition.ts` for naming

#### `functions`
Utils functions used in the application.

> ℹ️  Use `xxxx.function.ts` for naming

#### `hooks`
Custom hooks belong here
> ℹ️  Use `xxxx.hook.ts` for naming

#### `query`
Add all the React Query (or any other library) here to be used in the components.
> ℹ️  Use `xxxx.query.ts` for naming

#### `resources`
Similar to `query` folder, but for promise and http requests.
Some of the queries in `query` folder might use these resources.
> ℹ️ Use `xxxx.resource.ts` for naming


#### `types`
**All** the exported types and interfaces must belong to this, and optionally also some JS constants marked with `as const` (which act as types and can be used to infer types from it)

> ℹ️ Use `xxxx.type.ts` for naming
