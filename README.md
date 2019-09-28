# VS Code extension - Vue Component Importer extension

Adds `import` statement and `component` property to current .vue single file component file.

Via:

1. Placing your cursor on the component tag inside `<template />` section and triggering keybind/command pallete.
2. (TODO) specifying component name in command pallete.
3. (TODO) import all components in file in one go.

> ! TODO: Currently assumes filename of component is `PascalCase.vue` and imports as `PascalCase.vue`. Future release will find `kebab-case.vue` or `PascalCase.vue` file.

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

Press keybinding `(default ctrl/cmd+i)` or Command Pallete `Vue: Import vue component at cursor`

### After

```html
<template>
  <MyComponent />
</template>
<script>
  import MyComponent from '../../../MyComponent.vue';
  export default {
    components: {
      EbPopper,
    },
  };
</script>
```

## Extension Settings

- `vue-component-importer.enableDebugMessages`: enable/disable debug messages

## Extension Keybinding

- `CtrlCmd+i`: Trigger cursor position import

## Extension Command Pallete

- `Vue: Import vue component at cursor`
