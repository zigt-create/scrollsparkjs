# Scroll Spark JS

## Installatie
```bash
ddev auth ssh
```

```bash
ddev npm install "git@github.com:zigt-create/scrollsparkjs.git#main" --save
```

```js
import "scrollsparkjs"
```

```css
.hide {
  opacity: 0;
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
	}
}
```

### geavanceerd gebruik:
Percentage hoeveel de div in beeld moet zijn voordat de animatie start.

```html
<div class="item hide" data-inview='{"direction": "fade-in", "percentVisible": 0, "percentVisibleMobile": 20}'>
```

```scss
@keyframes fade-in {
	0% {opacity: 0;}
	100% {opacity: 1;}
}


.item {
	&.animation-fade-in {
		animation: fade-in .5s ease-in-out forwards;
	}
}
```

### cascade gebruik:
Children van item krijgen een voor een een animatie.
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
	}
}
```

### text gebruik:
Elke letter in een stuk tekst wordt in <span> gezet.
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
		}
	}
}
```

### container gebruik:
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
	}
}
```