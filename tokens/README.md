# Tokens de Diseño

Este directorio contiene los tokens de diseño utilizados en el sistema de diseño.

## Estructura

- `/figma/`: Tokens exportados directamente desde Figma
- `/transformed/`: Tokens transformados para su uso con Style Dictionary

## Flujo de trabajo

1. **Diseño de tokens en Figma**

   - Los diseñadores definen los tokens en Figma utilizando el plugin "Tokens Studio for Figma"
   - Se organizan en categorías: colores, tipografía, espaciado, sombras, etc.

2. **Exportación desde Figma**

   - Exportar los tokens desde Figma como JSON
   - Guardar el archivo en `/tokens/figma/tokens.json`

3. **Transformación de tokens**

   - Ejecutar `npm run transform-tokens` para convertir los tokens de Figma a un formato compatible con Style Dictionary
   - Esto genera archivos en `/tokens/transformed/`

4. **Generación para plataformas**
   - Ejecutar `npm run build-tokens` para generar los tokens en diferentes formatos (CSS, SCSS, JS)
   - Los archivos generados se guardan en `/dist/{css,scss,js}/`

## Uso en el proyecto

### CSS

```css
.mi-componente {
  background-color: var(--color-primary-azul-protecci-n-500);
  box-shadow: var(--shadow-m);
}
```

### SCSS

```scss
.mi-componente {
  background-color: $color-primary-azul-protecci-n-500;
  box-shadow: $shadow-m;
}
```

### JavaScript

```js
import { ColorPrimaryAzulProtecciN500, ShadowM } from '../dist/js/tokens';

const styles = {
  backgroundColor: ColorPrimaryAzulProtecciN500,
  boxShadow: ShadowM,
};
```

## Categorías de tokens

- **Color**: Paletas de colores primarios, secundarios y básicos
- **Shadow**: Diferentes niveles de sombras (XXS, XS, S, M, L, XL)
- **Typography**: Estilos tipográficos (pendiente de implementación completa)
