# Scroll Spark JS

## Installatie
```bash
ddev npm install "git@github.com:zigt-create/scrollsparkjs.git#main" --save
```

```js
import "scrollsparkjs"
```

```scss
.hide {
  opacity: 0;
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
}
```

In de html.html.twig laag in de head.
```html
<noscript>
  <style type="text/css">
    .hide {
      opacity: 1;
    }
  </style>
</noscript>
```

## Gebruik

### Normaal gebruik:
```html
<div class="item hide" data-inview='{"direction": "fade-in"}'>
```

```scss
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.item {
  &.animation-fade-in {
    animation: fade-in .5s ease-in-out forwards;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
```

### Geavanceerd gebruik:
Threshold hoeveel een element in beeld moet zijn voordat de animatie start.

0 = 0%, 0.5 = 50%, 1 = 100%

```html
<div class="item hide" data-inview='{"direction": "fade-in", "threshold": 0.5, "thresholdMobile": 0.2}'>
```

```scss
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.item {
  &.animation-fade-in {
    animation: fade-in .5s ease-in-out forwards;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
```

### Pixel offset:
rootMargin geeft een offset mee aan de threshold.

default is:
```js
rootMargin = '0px 0px 0px 0px'
```
top left/right bottom

```html
<div class="item hide" data-inview='{"direction": "fade-in", "rootMargin": "-200px"}'>
```
Het element komt in beeld wanneer die 200px over 0% van de threshold is.

```scss
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.item {
  &.animation-fade-in {
    animation: fade-in .5s ease-in-out forwards;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
```

### Herhaal animatie:
De animatie wordt herhaald telkens wanneer het element in beeld komt.

```html
<div class="item hide" data-inview='{"direction": "fade-in", "showOnce": false}'>
```

```scss
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.item {
  &.animation-fade-in {
    animation: fade-in .5s ease-in-out forwards;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
```

### Cascade gebruik:
Children van het element krijgen een voor een een animatie.
Met damping kun je een vertraging toevoegen.

```html
<div class="item" data-inview='{"direction": "fade-in", "cascade": true, "damping": 0.25}'>
  <div class="item-child hide"></div>
  <div class="item-child hide"></div>
  <div class="item-child hide"></div>
</div>
```

```scss
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}


.item {
  .item-child.animation-fade-in {
    animation: fade-in .5s ease-in-out forwards;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
```

### Text gebruik:
Elke letter in een stuk tekst wordt in een span gezet.
Met damping kun je een vertraging toevoegen.

```html
<h3 class="text" data-inview='{"direction": "fade-in", "damping": 0.25, "text": true}'>Tekst</h3>
```

```scss
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

h3 {
  span {
    position: relative;
    &.animation-fade-in {
      animation: fade-in .5s ease-in-out forwards;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  }
}
```

### Container gebruik:
De animatie start wanneer de parent div in beeld is.

```html
<div class="item-parent">
  <div class="item hide" data-inview='{"direction": "fade-in", "container": ".item-parent"}'></div>
</div>
```

```scss
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.item {
  &.animation-fade-in {
    animation: fade-in .5s ease-in-out forwards;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
```
