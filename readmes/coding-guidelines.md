# coding guidelines

- small components FTW
- sync with `main` often
- every component **_must_** have examples
- every component **_must_** have tests (ideally proving the tickets Acceptance Criteria)
- prefer `interface` over `type`
- prefer react hooks over react classes
- stronlgy enforce accessibility, `throw` if accessibility errors are encountered
- name prop definitions well
- run `yarn all` before opening a PR (which runs tests, formats files, ect.)

:heavy_check_mark:

```
interface AwesomeComponentProps { /* ... */ }
export const AwesomeComponent = ({ /* ... */ }: AwesomeComponentProps) => { /* ... */ }
```

:x:

```
interface Props { /* ... */ }
export const AwesomeComponent = ({ /* ... */ }: Props) => { /* ... */ }
```

- deconstruct the props

:heavy_check_mark:

```
interface AwesomeComponentProps {
  goodname: string;
  excellentname: number;
}
export const AwesomeComponent = ({
  goodname,
  excellentname,
  ...rest
}: AwesomeComponentProps) => { /* ... */ }
```

:x:

```
interface AwesomeComponentProps {
  goodname: string;
  excellentname: number;
}
export const AwesomeComponent = (props: AwesomeComponentProps) => { /* ... */ }
```

- **do** export your named component (`export const MyComponent = () => {}`), _never_ `export default`
- FOLLOW THE [ACCESSIBILITY GUIDELINES](./accessibility-guidelines.md)

## naming conventions

> When creating a component that _must_ be used with specific sub-components, use `Parent` w/ `Parent.Child` syntax

:heavy_check_mark:

```javascript
<TopNav>
  <TopNav.LinkButton>I am a Link</TopNav.LinkButton>
  <TopNav.IconButton>I am a Button</TopNav.IconButton>
</TopNav>
```

:x:

```javascript
<TopNav>
  <LinkButton>I am a Link</LinkButton>
  <IconButton>I am a Button</IconButton>
</TopNav>
```
