Q. Is there any callback mechanism to control the rendering of child component if the parent component hasn't changed its input but changed its context for its own?

```
  PlumeJS has built-in mechanism to deal with this. Here we have 3 usecases : 

  1. Parent Component context changed and the new context has effect on child's input attribute
     In this case,  Child component re-renders 
  2. Parent Component context changed and the new context has no effect on child's input attribute 
     In this case,  child component will not re-render 
  3. Parent Component context changed but, Child component is just placeholder, to be specific no attributes passed        
    In this case,  it will re-render the child component    


  If and only if the component input got changed then only that component will re-render if its parent component is re-rendered. But if the child component has no inputs from parent but simply acts as a placeholder then the child component will re-render if the parent is re-rendered.
```