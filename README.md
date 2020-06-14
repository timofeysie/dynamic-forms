# Dynamic Forms

## Workflow

```shell
npm start
npm test
npm run build
```

## Try out react-cmi5

### [Issue #15](https://github.com/timofeysie/dynamic-forms/issues/15).

What is cmi5?  I've used the xAPI before for e-learning project, and lurk around the spec project.  One issue that came up ended up having a comment about cmi5 which appears to be a stripped down/focused use case of the xAPI.

These are some notes about what it is an how it's used.

You can read more on the AICC [Cmi5 project](https://github.com/AICC/CMI-5_Spec_Current/blob/quartz/cmi5_spec.md#overview).  What is AICC?  The title of their profile says only *The cmi5 Project xAPI Profile for LMS systems*.  That isn't exactly an acronym for AICC.

The [Summary of cmi5 in Action](https://xapi.com/cmi5-technical-101/?utm_source=google&utm_medium=natural_search) provides a good checklist for what we would want a client to implement:

1. Create Course structure
2. Add AUs and Blocks to Course
3. Import Course into LMS
4. Registration is created in LMS at Course level for a specific Learner
5. AUs are launched in a Session for a Registration which may occur in a new window or existing one, a “Launched” Statement is recorded
6. AU starts execution by retrieving LRS authentication credentials and various other launch data (including the launch mode), an “Initialized” Statement is recorded
7. AU manages content interaction, depending on mode and Learner actions it may record “Passed” or “Failed”, and/or “Completed” Statements
8. If the above Statements satisfy the “Move On” criteria then the LMS records a “Satisfied” Statement for any Block or Course that has been satisfied
9. AU may record “cmi5 allowed” Statements, must occur between “Initialized” and “Terminated” Statements but otherwise can be intermixed with other “cmi5 defined” Statements
10. AU ends execution, a “Terminated” Statement is recorded indicating the end of the Session
11. AU loads return URL as provided in launch data by LMS
12. LMS may determine that a Session has been concluded without a “Terminated” statement having been recorded, at which point it records an “Abandoned” Statement
Multiple sessions in various launch modes may occur for the same Registration

Sone definitions

- Learning Management Systems (LMS)
- Assignable Units (AU)

The launchable piece of content that includes the concepts of completion, pass/fail, score, and duration. Each course requires at least one AU. AU metadata is captured in the Course structure file, but content assets may be included in a package or hosted remotely.

### React Cmi5

React wrapper component for an xapi/cmi5 assignable unit [from this repo](https://github.com/beatthat/react-cmi5/blob/master/README.md).

EsLint is now causing problems in this project.  The VSCode file structure window is all read with comments like this:

```txt
module "c:/Users/timof/repos/timofeysie/dynamic-forms/node_modules/@types/react/index"
Strings must use singlequote.eslintquotes
```

What happened to the airbnb linting that was setup at the beginning of this project?

Also, since this is a TypeScript project, there will be things like this to deal with:

```bash
Could not find a declaration file for module 'react-cmi5'. 'C:/Users/timof/repos/timofeysie/dynamic-forms/node_modules/react-cmi5/build/index.js' implicitly has an 'any' type.
  Try `npm install @types/react-cmi5` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-cmi5';`  TS7016
```

The way to cheat here is put this before the import:

```js
// @ts-ignore
```

Next:

```js
Property 'passed' does not exist on type 'Readonly<{}> & Readonly<{ children?: ReactNode; }>'.  TS2339
```

With TypeScript, you need to define what your props and state will look like using an interface and TypeScript's generic implementation of React.Component.  The stupid way to handle this without knowing anything would be this:

```js
interface IExampleQuestionProps {
  passed?: any;
  failed?: any;
  terminate?: any;
}
interface IExampleQuestionState {
  score?: any;
}
export default class ExampleQuestion extends Component<IExampleQuestionProps, IExampleQuestionState> {
```

Of course, it's a good idea to read to code and add the correct types.  For now, just getting the example to work is enough.  Just is just to find out what Cmi5 is all about.

There is a basic question [in this example](https://github.com/beatthat/react-cmi5/blob/master/example/single-question-assignable-unity/src/ExampleQuestion.js) on the beat that react-cmi5 repo.  This gives us a starting point for playing around with Cmi5.

### Fixing the linting errors with quick fixes

As soon as the basic form was in and working, it was time to fix the red screen in file.  The main issues were double quotes which and line breaks from working on a mac I suppose.  But who knows, because React uses double quotes.  Isn't that what airbnb uses?  To get an overview of all the issues, we can do some quick fixes recommended by VSCode, which look like this:

```bash
/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable quotes */
```

This might be a quick fix for this file, but as soon as you open another file, for example from the pre-existing dynamic forms component, you get red screen again.  However, there were some good points raised by suppressing those for a bit and taking care of real code issues shown next.

Then there are only a few more more code specific errors.  Such as:

```js
const score = this.state.score; // score was set when user chose a radio-button answer
```

The quick fix for this is:

```js
const { score } = this.state
```

There are a few more of these without any quick fix.  There is a [helpful link](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md) however.

Next, the template has some linting errors:

```txt
form label must be associated with a control.eslint(jsx-a11y/label-has-associated-control)
```

That's actually cool to point out as it's an accessability thing (a11y).  But, actually, we already have a label.  The solution was to put the label *around* the input.

```html
<label htmlFor="r3">
  <span>2</span>
  <input
    type="radio"
    id="r3"
    className="form-control"
    name="answer"
    value="1"
    onChange={(e) => onSelectAnswer(e)}
  />
</label>
```

I created a span for the text there, otherwise the number would just be hanging out somewhere in between.  The extra useless markup looks better structurally.  Just my view.

Next error, on the this.state:

```txt
Use callback in setState when referencing the previous state.eslintreact/no-access-state-in-setstate
```

```tsx
this.setState({
  ...this.state,
  score: e.target.value,
});
```

The last error:

```html
<button onClick={onSubmit}>submit</button>
```

```txt
Missing an explicit type attribute for buttoneslintreact/button-has-type
```

It needs a form around all the divs, as well as a type="submit".0

### Fixing linting errors properly

The [docs say for ESLint and airbnb say](npmjs.com/package/eslint-config-airbnb) *default export contains all of our ESLint rules, including ECMAScript 6+ and React. It requires eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y*.

That's some new stuff installed by this command:

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

However, the App.tsx file is still plagued by the "Strings must use singlequote" errors.

Nov 16, 2013:  This a preference. The important thing, as @jaseemabid points out is consistency. At Airbnb we use '' which is what is reflected in the style guide.

So I consented and converted the file to single quotes.  But I was using double quotes to be one with the React world.  It was a problem at first as I was so used to writing single quotes with Angular, that I kept forgetting to do it, and also got mixed up on the job a few times.  Actually being more aware of the code in detail is a good thing overall.

However, to fix some issues (line length), I wanted to run Prettier on the file.  This then fixed the issue I wanted but also reverted all the quotes to doubles again.  Great.  Disable Prettier, or disable Eslints rule?  In this case, also, ESlint then complains: *There should be no line break before or after '='.*  Can't have it either way.

Some issues with the DynamicForm.test.tsx file however are a problem.

```txt
'import' is only available in ES6 (use 'esversion: 6'). (W119)jshint(W119)
Peek Problem (Alt+F8)
No quick fixes available
```

What?  It's a .js file, so is that an issue?  I might point out that this project is only about 5 months old.  How can things change so much?  Anyhow, an addition of a.jshintrc file solves the issue with this contents:

```json
{
    "esversion": 6
}
```

Rename the file from .js to .jsx then, we get this:

```txt
JSX not allowed in files with extension '.jsx'eslintreact/jsx-filename-extension
```

What?  Anyhow, .tsx works.  That's what should be used anyhow.

Some more sticky issues:

Variable 'container' implicitly has an 'any' type.ts(7005)

Change this:

```js
let container = null;
```

for this:

```js
let container: Element | null = null;
```

Next, another TypeScript issue:

```js
expect(element1.children[0].children[0].type).toBe('text');
```

Causes this error:

```txt
Property 'type' does not exist on type 'Element'.ts(2339)
```

All up it took about an hour to fix the linting in a single file.

## The Lilianfelds Form

This approach is a metacognitive questionnaire to develops skills involved in critical thinking.

These are the skills involved in recognizing when these cognitive skills should be used, knowing how to use them, and why to use them.

This form will requite sections with titles. The format
questions when given a problem before they solve it.

### Sections

1. Questions to answer before beginning to solve a problem.
2. Questions to answer during the work.
3. Questions to answer after completing.

There also needs to be information about the document helpful in organizing the eventual list of form submissions.

* date
* label

The initial content for the form is as follows.

```text
a) How much time and effort is this problem worth?

input select: 1 2 3 4 5

b) What do you already know about this problem or argument?

input: text area

c) What is the goal or reason for engaging in extended and careful thought about this problem or argument?

input: text area

d) How difficult do you think it will be to solve this problem or reach a conclusion?

select: 1 2 3 4 5

e) How will you know when you have reached the goal?

imput: text

f) What critical-thinking skills are likely to be useful in solving this problem or analyzing this argument?

select with add: argument diagramming or mapping, implicit premise identification, and fallacy identification. 

Section: And during the work

g) Are you moving toward a solution?

input: select. yes no maybe

Section: After completing.

h) How well was the problem solved or analyzed?

range: 1 2 3 4 5
```

### Further study

More research needs to be done in how to sort and summarize the answers to these questions.  The brief states that the method builds the skills involved in recognizing when these cognitive skills should be used, knowing how to use them, and why to use them.

So information can be ordered/scored on the following criteria0:

1. when these cognitive skills should be used
2. knowing how to use them
3. why to use them

## Original readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
