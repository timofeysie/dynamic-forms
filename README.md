# Dynamic Forms

## Table of contents

- [How to send an xAPI statement](#how-to-send-an-xAPI-statement)
- [Try out react-cmi5](#try-out-react-cmi5)
- [The xAPI Golf Example](#the-xAPI-Golf-Example)
- [The Lilianfelds Form](#the-Lilianfelds-Form)
- [Dynamic Forms Challenge](#dynamic-Forms-Challenge)
- [Original readme](#original-readme)

## Workflow

```shell
npm start
npm test
npm run build
```

## How to send an xAPI statement

Looking at the [first exercise of the official xAPI JavaScript docs](https://xapi.com/try-developer/?utm_source=google&utm_medium=natural_search), there are four steps to get to sending a statement.

1. Get a library
2. Install the library
3. Configure the LRS
4. Send the statement

For this exercise, we will send the inputs of a dynamic form submission to our LRS.  In the in the previous section, React-cmi5, a wrapper component for an xapi/cmi5 AU was installed.  It's not the same thing as the lib mentioned here.

This is shown in the code snippet for #2:

```html
<script src="tincan.js"></script>
```

We would of course like to use npm to put the lib in the node_modules, as is standard.  So our options are:

- [tincanjs](https://www.npmjs.com/package/tincanjs), A JavaScript library for implementing the Experience API (Tin Can API).  Published 4 years ago.
- [tincan](https://www.npmjs.com/package/tincan), tincan-nodejs
A thin wrapper for reading and writing data using the tincan.me API using Node.JS. Published 7 years ago.

We not using NodeJS, so the first one may be appropriate.

```bash
npm install tincanjs
```

### 3. Configure the LRS

```js
endpoint: "https://lrs.example.com/tin-can-endpoint/",
username: "key, login or username",
password: "secret, password or pass"
```

So, we're just going to add our LRS password to the front end code?

There is a [management link](https://lrs.io/ui/lrs/sample-lrs-onlunez/keys/create/) on the LRS chosen with a create new access key option that has the following defaults:

```txt
KEY NAME access-key
READ XAPI PERMISSION: check
WRITE XAPI PERMISSION: check
LIMITED READ
ADVANCED QUERIES
JWT ACCESS
ENABLED: check
USERNAME: wupver
PASSWORD: nuwimu
```

Looking at the result, it's the same as the Sample Credentials provided when the account was created:

```txt
Username: username
Password: password
```

The docs say: *Keys can also be used to sign a JSON Web Token (JWT). If your application knows the secret password from a key with the Sign JWT permission enabled, it can create a one time use token to be provided to the xAPI client.*

If that's the case, and JWT ACCESS is not ticked, then what are they good for?  What is our endpoint?  That's what we need for the exercise.  On the analytics page we see this:

```txt
https://sample-lrs-onlunez.lrs.io/xapi/
```

That's worth a shot.

The next part is how to get the library to work in TypeScript.  This is the usual process of finding out that not everyone lives in the current era of front end development.

```js
import TinCan from 'tincanjs';
```

```txt
Could not find a declaration file for module 'tincanjs'. 'c:/Users/timof/repos/timofeysie/dynamic-forms/node_modules/tincanjs/build/tincan-node.js' implicitly has an 'any' type.
  Try `npm install @types/tincanjs` if it exists or add a new declaration (.d.ts) file containing `declare module 'tincanjs';`ts(7016)
```

```bash
>npm install @types/tincanjs
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@types%2ftincanjs - Not found
npm ERR! 404  '@types/tincanjs@latest' is not in the npm registry.
```

We could create a .d.ts file as [described here](https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam), but since this is just a test, the following will work to get a move on:

```js
// @ts-ignore
```

Then, creating the statement as shown in the example works fine.  Refresh the analytics page of the LRS and there are now 2142 Statements, one more than before the refresh.

The analytics page has the following graphs:

- Activity Over Time
- Actors With The Most Events
- Recently Active Objects
- Weekly Traffic
- Sessions
- Actor Behavior
- Activity Over Time Breakdown
- Most Active Parent Contexts
- Most Active Grouping Contexts
- High Scoring Objects
- Low Scoring Objects
- Verb Type
- Activity By Authority

Pretty nice.  Next is the ["prototypes"](https://xapi.com/prototypes/) exercise.

Another example is the [location tour demo](https://xapi.com/wp-content/assets/ClientPrototypes/Locator_TCAPI/index.html?endpoint=https%3A%2F%2Fcloud.scorm.com%2FScormEngineInterface%2FTCAPI%2Fpublic%2F&auth=Basic%20VGVzdFVzZXI6cGFzc3dvcmQ%3D&actor=%7B%22mbox%22%3A%22mailto%3Atest%40beta.projecttincan.com%22%2C%22name%22%3A%22Test%20User%22%2C%22objectType%22%3A%22Agent%22%7D&registration=e168d6a3-46b2-4233-82e7-66b73a179727).  Pretty cool idea, but the example code doesn't work.  No doubt google is not defined.

## Try out react-cmi5

### [Issue #15](https://github.com/timofeysie/dynamic-forms/issues/15)

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

#### Sone definitions

- Learning Management Systems (LMS)
- Assignable Units (AU)

The launch-able piece of content that includes the concepts of completion, pass/fail, score, and duration. Each course requires at least one AU. AU metadata is captured in the Course structure file, but content assets may be included in a package or hosted remotely.

### React Cmi5

React wrapper component for an xapi/cmi5 assignable unit [from this repo](https://github.com/beatthat/react-cmi5/blob/master/README.md).

After spending too much time on linting detailed in the [Problems with linting](#Problems with linting) section below, the form works.  It is a simple multiple choice form which does nothing yet.

The example question itself doesn't involve any cmi5, but is wrapped in a cmi5 tag.

```html
<Cmi5AU>
  <ExampleQuestion />
</Cmi5AU>
```

In the example question component, there are some props and an onSubmit function:

```js
    // props includes special actions for passed({score:1.0}) and failed({score: 0.0 })
    // These are wrappers for cmi.passed and cmi.failed
    // that make sure cmi has initialized before score is actually sent
    const {passed, failed} = this.props

    const onSubmit = () => {
      const score = this.state.score // score was set when user chose a radio-button answer
      if(score > 0) {
        this.props.passed(score)
      }
      else {
        this.props.failed(score)
      }
      this.props.terminate() // MUST call terminate to end the session
    }
```

It's inside a class file, which is something that will have to change.  One mandate for this project is that it avoids classes and uses the latest in React hooks and functional programming.  But this can wait for some refactoring after the example is working.

On it's own, the example is basically pseudo code.  There is no form yet, just:

```html
<div>
  question form here
  <button onClick={onSubmit}>submit</button>
</div>
```

The [example question](https://github.com/beatthat/react-cmi5/blob/master/example/single-question-assignable-unity/src/ExampleQuestion.js) markup provides the basic radio button multiple choice question.

The notes point out that as a child of Cmi5AssignableUnit the important piece to note is the use of the injected action properties 'passed' and 'failed', which the question can use to submit results.  Now that we have a LRS setup to send statements from the result of the initial dynamic form, the cmi5 form should do the same.  But there is no code showing what happens with the submit from the example question.

After a few more clicks up and down, it appears [the other example](https://github.com/beatthat/react-cmi5/tree/master/example/assignable-unity-sends-multiple-scores-in-result) in the source file has the answer for that.

*An example CMI5 assignable unit that connects to an LMS (the XAPI backend of an LMS) and reads/writes an xapi statement.*

It's work quoting more of these notes:

#### To satisfy the cmi5 protocol, you will need the following params

- `fetch`: a url to retrieve an access token for your XAPI server
- `endpoint`: the root endpoint for your XAPI server
- `activityId`: IRI/id for the XAPI object this assignable unit represents (callbacks to 'passed', 'failed' etc. will use this activity id)
- `registration`: basically an XAPI session id
- `actor`: account for which results will be applied (passed as a json XAPI actor object)

Details for the above are here in the cmi5 spec [here](https://github.com/AICC/CMI-5_Spec_Current/blob/quartz/cmi5_spec.md#81-launch-method)

For reference, the below is what an example url might look like

```txt
http://localhost:3000/?fetch=http://qa-pal.ict.usc.edu/api/1.0/cmi5/accesstoken2basictoken?access_token=41c847e0-fccd-11e8-8b7f-cf001aed3365&endpoint=http://qa-pal.ict.usc.edu/api/1.0/cmi5/&activityId=http://pal.ict.usc.edu/lessons/cmi5-ex1&registration=957f56b7-1d34-4b01-9408-3ffeb2053b28&actor=%7B%22objectType%22:%20%22Agent%22,%22name%22:%20%22taflearner1%22,%22account%22:%20%7B%22homePage%22:%20%22http://pal.ict.usc.edu/xapi/users%22,%22name%22:%20%225c0eec7993c7cf001aed3365%22%7D%7D
```

### Problems with linting

EsLint is now causing problems in this project.  The VSCode file structure window is all red with comments like this:

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

There is a basic question [in this example](https://github.com/beatthat/react-cmi5/blob/master/example/single-question-assignable-unity/src/ExampleQuestion.js) found while looking around the react-cmi5 repo.  This gives us a starting point for playing around with Cmi5.

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

All up it took about an hour to fix the linting in a single file.  I shouldn't say *fix* either.  When this project was set up, it was for a technical test, and I spent a lot of time trying to impress by setting up linting with tbe strictest airbnb stylesheet.

### End of line settings

As noted in the previous section, after coming back to this project a few months later on a different laptops, now Windows, not Mac, all the .tsx files were filled with linting errors, the most common being:

```txt
Expected linebreaks to be 'LF' but found 'CRLF'.eslintlinebreak-style
```

This is on the end of every line, making the entire file overview on the right hand side of the VSCode editor completely red.  The quick hack fix for this is this line at the top of every file you edit:

```js
/* eslint-disable linebreak-style */
```

When integrating Prettier and migrating from TSLint to ESLint at work, being the only front end dev with a Windows machine caused the same issue, which I fixed with this:

#### **`eslintrc.json`**

```json
"rules": {
  "prettier/prettier": ["error", {
    "endOfLine": "auto"
}],
```

When working in a team environment, the interactions between linting rules, editors and version control can be a bit of a bummer when it causes problems.  Thanks to the Windows developers for not playing nice, Windows will convert  LF to CRLF when checking files out, but not convert back when checking them in.  That's not very nice.

One solution is for each developer to handle their own editor settings.

#### **`.gitattributes`**

```txt
*js text eol=lf
```

## The xAPI Golf Example

To try xAPI in practice an LRS is setup.  After looking at a few options, a free account [at lrs.io](https://lrs.io/ui/lrs/sample-lrs-onlunez/) is using 4 out of 100 megabytes.

An example of using xAPI from [the official docs](https://xapi.com/try-developer/?utm_source=google&utm_medium=natural_search) has challenge 3, [the golf prototype](https://github.com/RusticiSoftware/TinCan_Prototypes/blob/master/GolfExample_TCAPI/index.html#L49-108) which is an example of a traditional style e-learning course that apparently they’ve been using for years with SCORM.

The file has Jan 8, 2016 as it's last date, but it has 2010 written all over it.  Think what you want about legacy code, you have to admit there's a lot of it out there.  Everyone is coming from a different background, so just because it's a single file that uses var, a year or more after let and const started being used so I'm guessing ES5 is what it's written in.

Notice that this is a "Tin Can" project, which is actually before it was even called xAPI.  

How old actually is it?  Brian J. Miller, the man, committed some code on Sep 4, 2012
A draft prototype by bscSCORM committed on Sep 13, 2011.

Man, I called it.  OK, I was one year off.  I have to say that, no one else seems to have blogged about using this code as far as I can see with a quick google.

Here is [something recent](https://www.valamis.com/hub/xapi) where it says xApi is the current standard.

### The highlights

Doing a deep dive into the index.html file on the repo.  Let's break it down into the highlights.

A few script tags.

- <script src="scripts/TinCanJS/build/tincan-min.js"
- <script src="scripts/common.js"

Some content definition.

```js
var pageArray = [ ... ],
  processedUnload = false,
  reachedEnd = false,
  maxPageReached = 0,
  tincan = new TinCan ({
    url: window.location.href,
    activity: GolfExample.CourseActivity
});
var BookmarkingTracking = function(){ };
BookmarkingTracking.prototype = {  };
var bookmarkingData = new BookmarkingTracking();
```

Some functions for sizing the iFrame

```js
function setIframeHeight(id, navWidth) { }
function getWindowHeight() { }
function SetupIFrame(){ }
```

A navigation functions

```js
function doStart(){ }
function goToPage(){ }
function doPrevious(){ }
function doNext(){ }
function doExit(){ }
function FormatChoiceResponse(value){ }
```

Start it up

```js
<body onload="doStart(false);">
```

Inline styles and a groovy ```<iframe></iframe>```.  Can it get any better (just kidding).

If we want to use this in a modern React setting, well linted and using hooks and all that, where does one start?

#### Let's look at the functions in the BookmarkingTracking.prototype

```js
BookmarkingTracking.prototype = {
  initFromBookmark: function(bookmark){ },
  reset: function(){  },
  save: function (callback){
      var bookmarking = {  };
      tincan.setState("bookmarking-data", bookmarking, { });
  },
  get: function(){ },
  setStartDuration: function(duration){ },
  setPage: function(page){ },
  getPage: function(){ },
  incrementPage: function (){ },
  decrementPage: function (){ },
  setCompletion: function(completion){ },
  getCompletion: function(completion){ },
  getAttemptDuration: function (){ },
  getSessionDuration: function (){ }
};
```

This is all the index page. The page array contains the following sections:

```html
"Playing/Playing.html",
"Playing/Par.html",
"Playing/Scoring.html",
"Playing/OtherScoring.html",
"Playing/RulesOfGolf.html",
"Etiquette/Course.html",
"Etiquette/Distracting.html",
"Etiquette/Play.html",
"Handicapping/Overview.html",
"Handicapping/CalculatingHandicap.html",
"Handicapping/CalculatingScore.html",
"Handicapping/Example.html",
"HavingFun/HowToHaveFun.html",
"HavingFun/MakeFriends.html",
"assessmenttemplate.html"
```

So along with the index, there are these sections:

- Playing
- Etiquette
- Handicapping
- HavingFun

I thought this was going to be an easy exercise, but it's going to require a bit of thought before getting into the React code.

## The Lilianfelds Form

These are the skills involved in recognizing when these cognitive skills should be used, knowing how to use them, and why to use them.

This form will requite sections with titles. The format
questions when given a problem before they solve it.

### Sections

1. Questions to answer before beginning to solve a problem.
2. Questions to answer during the work.
3. Questions to answer after completing.

There also needs to be information about the document helpful in organizing the eventual list of form submissions.

- date
- label

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

So information can be ordered/scored on the following criteria:

1. when these cognitive skills should be used
2. knowing how to use them
3. why to use them



Using an LRS (Learning Record Store) might be a solution to this.  Using the e-learning reporting approach, we should get what we want from the above.

The lrs.io demo account used to work with the xAPI code has an analytics page has the following graphs:

- Activity Over Time
- Actors With The Most Events
- Recently Active Objects
- Weekly Traffic
- Sessions
- Actor Behavior
- Activity Over Time Breakdown
- Most Active Parent Contexts
- Most Active Grouping Contexts
- High Scoring Objects
- Low Scoring Objects
- Verb Type
- Activity By Authority

## Dynamic Forms Challenge

The challenge was to create a React component that uses a JSON schema that dynamically creates a form and results in JSON outputted on submit.

It is to be a release ready, original app that takes between 2 to 3 hours to complete.
It was noted that the size of the task is ambitious and I wasn't expected to finish but to demonstrate how I would approach the problem.

The original part is questionable.  I used [this article](https://medium.com/curofy-engineering/dynamic-forms-with-react-js-d25d7c4f53d1) as a guide, but spent time setting up linting and a decent build process, converting the code to use the latest in React hooks, and covering everything with decent unit tests.

I started by implementing a single first/last name input and date of birth (validated older than 18) field that satisfy those requirements.

Due to spending a large amount of the allotted time on the unit testing the submit function, I was not able to implement some of the other fields.  I thought it was better to have well a well functioning and tested base for further development that a shallow implementation without any tests.  

I have detailed the unfinished work in [this issue](https://github.com/timofeysie/dynamic-forms/issues/5).

After proceeding with the interview process which meant three more interviews with the team, CTO and managers including a whiteboard test, I got the green light from all parties, and the Coronaviarus pandemic reared it's ugly head, so they then put a hiring freeze in place at the same time I was offered a role somewhere else.

After this I have occasionally implemented a bit more of the challenge by adding other component form types and tests.  Then I made a data model for the Lilianfels critical thinking checklist form and considered using this project as a test bed for xAPI code.

Here are all the notes from the initial challenge in reverse order.

### Testing the submit button

#### **`src\components\dynamicForms\DynamicForm.tsx`**

```js
const handleSubmit = (event) => {
  event.preventDefault();
  props.onSubmit(input);
};
```

This is the way the onsubmit bubbles up it's result:
In the DynamicForms.tsx:

```js
  const [ input, setInput] = useState({});
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSubmit(input);
  };
```

The result in the App.tsx file:

```js
  const onSubmit = (output: React.FormEvent<HTMLInputElement>) => {
    console.log('output',output);
  };
```

Trying to emulate that a bit in the test:

```js
  const onSubmitMock = jest.fn((output) => {
      return output;
    });
```

This doesn't work.  The result is still an empty object.  Maybe we have to mock/spy on the the useState input variable?

### Adding snapshot testing

During the week for February 3rd to 7th, added:

```json
    "react-test-renderer": "^16.12.0",
    "react-testing-library": "^8.0.1"
```

And snapshot testing.

Added snapshot testing and converted the form to a functional component

### TODO

- Make the DynamicForm component a function.
[The source article](https://medium.com/curofy-engineering/dynamic-forms-with-react-js-d25d7c4f53d1) was written in Dec 10, 2018, so this takes some work.
- Implement the rest of the input types in the demo.
Reverse engineer the data from the test example in our dynamic form schema.
- remove generic 'any' types
- format the date picker output
- Warning: Each child in a list should have a unique "key" prop.
- Add gender, contact and guardian input types
- Test the submit button #6

Next, test changing the date (something like this):

```js
    const input = getByLabelText('Change text');
    input.value= 'input text';
    fireEvent.change(input);
    fireEvent.click(getByText('Save'));
    console.log('saved', getByTestId('saved').innerHTML);
    expect(getByTestId('saved')).toHaveTextContent('input text')
```

```js
const input = getByTestId("datepickerid").children[0].children[0].children[0];
```

```bash
console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
      Error: Uncaught [TypeError: props.onSubmit is not a function]
          at reportException (C:\Users\timof\repos\timofeysie\dynamic-forms\node_modules\jsdom\lib\jsdom\living\helpers\runtime-script-errors.js:66:24)
```

### Validation

Do we need a form element?

https://codeburst.io/how-to-use-html5-form-validations-with-react-4052eda9a1d4
Using HTML Constraint API validation 
No regex here so wont solve the user name in one field restraint.

https://stackoverflow.com/questions/41296668/reactjs-form-input-validation
Use JS to do the validation, provides good flexibility.
Do we validate in the input components or the dynamic form component?  Or both?

Two words: /(\w.+\s).+/

### The date picker

Using react-datepicker - npm 500,000 weekly downloads.

```txt
TypeError: Cannot read property 'name' of undefined
```

The event is this:

event Thu Feb 13 2020 13:02:57 GMT+1100 (Australian Eastern Daylight Time)

Have to convert that to a un usable even with the date picker component I suppose.

### Linting

On a Saturday/Sunday stretch, did some work on the linting.

Using a lot of /*eslint-disable*/ to get the linting done while the transition from class to functional component gets underway.

Removed the old index in the components directory and used the new functional DynamicForm component and got the tests to pass and ran into the submit form to parent issue when Darragh arrived and I had to stop working and start drinking.

Still trying to get the submit form action passed out of the dynamic form component into the calling parent, ie: App.tsx.

```js
const DynamicForm2 = (props: any) => {
  const [onSubmit] = useState(props.onSubmit);
  return (
    <form onSubmit={() => {onSubmit}}>
```

The last line there causes this error:

```txt
Failed to compile.
./src/components/dynamicForms/DynamicForm.tsx
  Line 15:28:  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions
```

Search for the keywords to learn more about each error.

Looking at this example:
https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/

We can fix the on submit issue in the Dynamic Form, but still have problems getting that to the parent.

```js
const DynamicForm = (props: any) => {
  const [onSubmit] = useState(props.onSubmit);
  const [fields, setFields] = useState(props.fields);
  const [inputState, setInputState] = useState(props);
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    onSubmit(inputState);
  }
  const handleChange = (event: any) => {
    setInputState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
```

Then we get:  ```TypeError: onSubmit is not a function```

The golden ticket that lets us move forward is:
Instead of this:

```js
const [onSubmit] = useState(props.onSubmit);
```

This:

```js
props.onSubmit(inputState);
```

Next, adding a new text area component, realized it was not needed.  Looking at the validation required however, a date field is the next thing we should worry about.  As well as validation for both:

```txt
name
    text based
    should enforce the need for a first and last name (separated by a space)
date of birth
    date based
    required, should be older than 18
```

The output will look like this:

```json
{
    name: "John Foo",
    dob: "1990-01-01",
```

So we need to add a validation field and micro-syntax to allow the input components to do it.

First, the text area does not show up in the submit.

```js
const [fields] = useState(props.fields);
  const [...inputFields] = useState(props);
```

This is the way it's shown in the article (which uses a class):

```js
 const { fields, ...inputFields } = this.state;
```

This breaks the app:

```js
const [fields, inputFields] = useState(props);
```

The key is how the state is updated:

```js
[event.currentTarget.name]: event.currentTarget.value,
```

[Source](https://medium.com/curofy-engineering/dynamic-forms-with-react-js-d25d7c4f53d1)

The article says: *In the Form component, _handleChange will trigger onChange from the child component and will store the state with respect to the ‘name: value’ of the element.*

Not sure about that since we've changed so much.  The last input edited is the only one that shows up on submit.

The state doesn't need to be connected to the fields that are passed in.  The form can keep it's own state and then on submit, create the final json that will be emitted.  So we should have all we need now to do that.  Then get on with validating the name field and then creating the date component.

The answer was simple, but took some strange error making to point me in the right direction.

```js
const [ input, setInput] = useState({});
...
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setInput({
      ...input, 
        [event.currentTarget.name]: event.currentTarget.value
    });
  };
```

Then our output in the parent App.tsx file is: 

```json
{email: "asdf", some-name: "dsa"}
```

There we go.  Next up, convert that text field to a date picker, then change the first input to name with two part validation and we're on our way.
DO some TDD by creating the test and then making it pass.

```js
interface IProps {
  fields: any
}
const DynamicForms = ({
  fields
}: IProps) => (
```

### The details of our frontend challenge

#### Purpose:

We want you to create a React component that can render different forms, e.g. sign up, mailing list registration, feedback form. Given the proposed variety to support, we want to create a single component that can be easily adapted.

#### Details:

Create a React component that can accept a JSON-based form definition via a prop and produce a form that, in this case, can be used to collect a person’s details. The form should include the following fields:

```txt
name
    text based
    should enforce the need for a first and last name (separated by a space)
date of birth
    date based
    required, should be older than 18
gender
    options based (male/female)
    optional
contact number
    text based
    optional
    allow for multiple values (e.g. mobile, home, etc)
require guardian consent
    checkbox
    optional
guardian details (name, contact)
    text based
    required/applicable if consent checkbox is ticked
```

The form should provide the resulting form data on successful submission. A valid output for the form might be the following:

```js
{
    name: "John Foo",
    dob: "1990-01-01",
    gender: 1,
    contact: [{
        type: "mobile",
        value: "0400123123"
    },{
        type: "home",
        value: "610000000"
    }],
    guardian: {
        name: "Jane Foo",
        contact: "0400123123"
    }
}
```

The form should be generated at runtime based on a JSON schema that you devise. Changing the schema should alter what fields are shown and what data is returned on submit.

Please ensure the code is original - please don't not use an existing form library.

We expect you to spend 1 - 2 hours on the task, although you’re welcome to spend longer if interested. The size of the task is ambitious so we don't expect you to finish. We are looking at how you approach the problem.

Please treat the task as if you were producing code ultimately for release. Please use Git and make a commit at the start (i.e. blank repo) and after an hour. In your closing commit please mention the total amount of time you spend on the task.

If you have any questions about the problem, please feel free to ask me. Once finished, please send the repo through to me.

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
