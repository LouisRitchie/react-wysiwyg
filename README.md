# React WYSIWYG Editor

WYSIWYG, or What-You-See-Is-What-You-Get, allows the uninitiated to get things done on the internet.
A WYSIWYG gives you tools to add text, choose fonts and colours, and place pictures on a canvas, and then have that canvas turned into a website.
WYSIWYG editors are not limited to the internet. Microsoft Word is a WYSIWYG, because the document being edited and the output document are the same. You get what you see.
An example of a non-WYSIWYG document editor is Latex. In Latex, you write code that is later typeset into a finished document. You cannot see 
the document until you compile(?) your Latex. The benefit of Latex is tighter contol and specificity; the benefit of MS Word is that anyone can use it effectively after 10 
minutes getting oriented.

The goal of this project is to provide a WYSIWYG for React apps. Features are limited: Add a background, rectangular areas, and text, as well as choosing colours and fonts.
Once a layout is completed by the user, a zip archive can be generated that contains the code and configuration for the given layout.
Unarchive the zip archive, run `npm i && npm run dev`, and the user can get started adding features.

## Todo

- [x] Create a grid layout that allows you to select intersecting x and y gridlines
- [x] Implement Drag and Drop to create rectangular areas on the grid
- [ ] Multiple squares, allow squares to be selected
- [ ] Implement text areas
- [ ] Implement a simple toolbox, to toggle between rectangular areas and text areas
- [ ] Allow user defined colours for text areas, rectangular areas, and background
- [ ] Allow linear gradients for backgrounds
- [ ] Font picker using Google Fonts
- [ ] Generate Site button that produces a React/Webpack/Sass project as a .zip archive
- [ ] Preview button that runs the generated site at `wysiwyg.louisritchie.com/preview`
- [ ] Host the site at `wysiwyg.louisritchie.com`
- [ ] Save work using email and password
- [ ] Have multiple workspaces and easy way to switch between them

## Installation

### Development
```
npm i
npm run dev
```

### Production
```
npm start
```

### Code conventions

- Every outermost markup tag in each component shall be called "componentWrapper".
```
export default function Square() {
    return (
        <div className='squareWrapper'>
            {/* your code here */}
        </div>
    )
}
```