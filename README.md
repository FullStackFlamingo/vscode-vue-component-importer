# VS Code extension - [Vue Component Importer extension ](https://marketplace.visualstudio.com/items?itemName=FullStackFlamingo.vscode-vue-component-importer)

<p>
  <a href="https://marketplace.visualstudio.com/items?itemName=FullStackFlamingo.vscode-vue-component-importer">
    <img src="https://vsmarketplacebadge.apphb.com/version-short/FullStackFlamingo.vscode-vue-component-importer.svg?style=flat-square">
  </a>
</p>

Adds `import` statement and `component` property to current .vue single file component file. Imports `kebab-case.vue` or `PascalCase.vue`.

Via:

1. Placing your cursor on the component tag inside `<template />` section and triggering keybind/command pallete.
2. (TODO) specifying component name in command pallete.
3. (TODO) import all components in file in one go.

## Example

### Before

(place cursor on `MyComponent` tag)

```html
<template>
  <MyComponent />
</template>
<script>
  export default {};
</script>
```

Press keybinding `(default: ctrl+i / MacOS = cmd+i)` or Command Pallete `Vue: Import vue component at cursor`

### After

```html
<template>
  <MyComponent />
</template>
<script>
  import MyComponent from '../../../MyComponent.vue';
  export default {
    components: {
      MyComponent,
    },
  };
</script>
```

## Extension Settings

- `vue-component-importer.enableDebugMessages`: enable/disable debug messages

## Extension Keybinding

- `Ctrl+i (MacOS = Cmd+i)`: Trigger cursor position import

## Extension Command Pallete

- `Vue: Import vue component at cursor`
