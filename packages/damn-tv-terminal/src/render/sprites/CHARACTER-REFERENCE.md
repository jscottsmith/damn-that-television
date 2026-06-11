# Terminal character tokens

Monospace grid character set. One glyph = one cell. Encoding: UTF-8.

---

## Width

| Property | Definition |
| --- | --- |
| `single` | One terminal column in standard monospace fonts. |
| `extended` | Typically one column; coverage and metrics vary by font and terminal. |
| `excluded` | Not part of this set — multi-column, multi-codepoint, or non-printing. |

---

## `basic-latin` · U+0020–U+007E · `single`

```
  ! " # $ % & ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; < = > ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~
```

| Token | Char | Unicode |
| --- | --- | --- |
| `space` | ` ` | U+0020 |
| `exclamation` | `!` | U+0021 |
| `quotation` | `"` | U+0022 |
| `number-sign` | `#` | U+0023 |
| `dollar` | `$` | U+0024 |
| `percent` | `%` | U+0025 |
| `ampersand` | `&` | U+0026 |
| `apostrophe` | `'` | U+0027 |
| `left-paren` | `(` | U+0028 |
| `right-paren` | `)` | U+0029 |
| `asterisk` | `*` | U+002A |
| `plus` | `+` | U+002B |
| `comma` | `,` | U+002C |
| `hyphen` | `-` | U+002D |
| `period` | `.` | U+002E |
| `slash` | `/` | U+002F |
| `digit-0` … `digit-9` | `0`–`9` | U+0030–U+0039 |
| `colon` | `:` | U+003A |
| `semicolon` | `;` | U+003B |
| `less-than` | `<` | U+003C |
| `equals` | `=` | U+003D |
| `greater-than` | `>` | U+003E |
| `question` | `?` | U+003F |
| `at` | `@` | U+0040 |
| `upper-a` … `upper-z` | `A`–`Z` | U+0041–U+005A |
| `left-bracket` | `[` | U+005B |
| `backslash` | `\` | U+005C |
| `right-bracket` | `]` | U+005D |
| `circumflex` | `^` | U+005E |
| `underscore` | `_` | U+005F |
| `grave` | `` ` `` | U+0060 |
| `lower-a` … `lower-z` | `a`–`z` | U+0061–U+007A |
| `left-brace` | `{` | U+007B |
| `vertical-bar` | `\|` | U+007C |
| `right-brace` | `}` | U+007D |
| `tilde` | `~` | U+007E |

---

## `box-drawing` · U+2500–U+257F · `single`

| Token | Char | Unicode |
| --- | --- | --- |
| `light-horizontal` | `─` | U+2500 |
| `heavy-horizontal` | `━` | U+2501 |
| `light-vertical` | `│` | U+2502 |
| `heavy-vertical` | `┃` | U+2503 |
| `light-triple-dash-horizontal` | `┄` | U+2504 |
| `heavy-triple-dash-horizontal` | `┅` | U+2505 |
| `light-triple-dash-vertical` | `┆` | U+2506 |
| `heavy-triple-dash-vertical` | `┇` | U+2507 |
| `light-quadruple-dash-horizontal` | `┈` | U+2508 |
| `heavy-quadruple-dash-horizontal` | `┉` | U+2509 |
| `light-quadruple-dash-vertical` | `┊` | U+250A |
| `heavy-quadruple-dash-vertical` | `┋` | U+250B |
| `light-down-right` | `┌` | U+250C |
| `down-light-right-heavy` | `┍` | U+250D |
| `down-heavy-right-light` | `┎` | U+250E |
| `heavy-down-right` | `┏` | U+250F |
| `light-down-left` | `┐` | U+2510 |
| `down-light-left-heavy` | `┑` | U+2511 |
| `down-heavy-left-light` | `┒` | U+2512 |
| `heavy-down-left` | `┓` | U+2513 |
| `light-up-right` | `└` | U+2514 |
| `up-light-right-heavy` | `┕` | U+2515 |
| `up-heavy-right-light` | `┖` | U+2516 |
| `heavy-up-right` | `┗` | U+2517 |
| `light-up-left` | `┘` | U+2518 |
| `up-light-left-heavy` | `┙` | U+2519 |
| `up-heavy-left-light` | `┚` | U+251A |
| `heavy-up-left` | `┛` | U+251B |
| `light-vertical-right` | `├` | U+251C |
| `vertical-light-right-heavy` | `┝` | U+251D |
| `up-heavy-right-down-light` | `┞` | U+251E |
| `down-heavy-right-up-light` | `┟` | U+251F |
| `vertical-heavy-right-light` | `┠` | U+2520 |
| `down-light-right-up-heavy` | `┡` | U+2521 |
| `up-light-right-down-heavy` | `┢` | U+2522 |
| `heavy-vertical-right` | `┣` | U+2523 |
| `light-vertical-left` | `┤` | U+2524 |
| `vertical-light-left-heavy` | `┥` | U+2525 |
| `up-heavy-left-down-light` | `┦` | U+2526 |
| `down-heavy-left-up-light` | `┧` | U+2527 |
| `vertical-heavy-left-light` | `┨` | U+2528 |
| `down-light-left-up-heavy` | `┩` | U+2529 |
| `up-light-left-down-heavy` | `┪` | U+252A |
| `heavy-vertical-left` | `┫` | U+252B |
| `light-down-horizontal` | `┬` | U+252C |
| `left-heavy-right-down-light` | `┭` | U+252D |
| `right-heavy-left-down-light` | `┮` | U+252E |
| `down-light-horizontal-heavy` | `┯` | U+252F |
| `down-heavy-horizontal-light` | `┰` | U+2530 |
| `right-light-left-down-heavy` | `┱` | U+2531 |
| `left-light-right-down-heavy` | `┲` | U+2532 |
| `heavy-down-horizontal` | `┳` | U+2533 |
| `light-up-horizontal` | `┴` | U+2534 |
| `left-heavy-right-up-light` | `┵` | U+2535 |
| `right-heavy-left-up-light` | `┶` | U+2536 |
| `up-light-horizontal-heavy` | `┷` | U+2537 |
| `up-heavy-horizontal-light` | `┸` | U+2538 |
| `right-light-left-up-heavy` | `┹` | U+2539 |
| `left-light-right-up-heavy` | `┺` | U+253A |
| `heavy-up-horizontal` | `┻` | U+253B |
| `light-vertical-horizontal` | `┼` | U+253C |
| `left-heavy-right-vertical-light` | `┽` | U+253D |
| `right-heavy-left-vertical-light` | `┾` | U+253E |
| `vertical-light-horizontal-heavy` | `┿` | U+253F |
| `up-heavy-down-horizontal-light` | `╀` | U+2540 |
| `down-heavy-up-horizontal-light` | `╁` | U+2541 |
| `vertical-heavy-horizontal-light` | `╂` | U+2542 |
| `left-up-heavy-right-down-light` | `╃` | U+2543 |
| `right-up-heavy-left-down-light` | `╄` | U+2544 |
| `left-down-heavy-right-up-light` | `╅` | U+2545 |
| `right-down-heavy-left-up-light` | `╆` | U+2546 |
| `down-light-up-horizontal-heavy` | `╇` | U+2547 |
| `up-light-down-horizontal-heavy` | `╈` | U+2548 |
| `right-light-left-vertical-heavy` | `╉` | U+2549 |
| `left-light-right-vertical-heavy` | `╊` | U+254A |
| `heavy-vertical-horizontal` | `╋` | U+254B |
| `light-double-dash-horizontal` | `╌` | U+254C |
| `heavy-double-dash-horizontal` | `╍` | U+254D |
| `light-double-dash-vertical` | `╎` | U+254E |
| `heavy-double-dash-vertical` | `╏` | U+254F |
| `double-horizontal` | `═` | U+2550 |
| `double-vertical` | `║` | U+2551 |
| `down-single-right-double` | `╒` | U+2552 |
| `down-double-right-single` | `╓` | U+2553 |
| `double-down-right` | `╔` | U+2554 |
| `down-single-left-double` | `╕` | U+2555 |
| `down-double-left-single` | `╖` | U+2556 |
| `double-down-left` | `╗` | U+2557 |
| `up-single-right-double` | `╘` | U+2558 |
| `up-double-right-single` | `╙` | U+2559 |
| `double-up-right` | `╚` | U+255A |
| `up-single-left-double` | `╛` | U+255B |
| `up-double-left-single` | `╜` | U+255C |
| `double-up-left` | `╝` | U+255D |
| `vertical-single-right-double` | `╞` | U+255E |
| `vertical-double-right-single` | `╟` | U+255F |
| `double-vertical-right` | `╠` | U+2560 |
| `vertical-single-left-double` | `╡` | U+2561 |
| `vertical-double-left-single` | `╢` | U+2562 |
| `double-vertical-left` | `╣` | U+2563 |
| `down-single-horizontal-double` | `╤` | U+2564 |
| `down-double-horizontal-single` | `╥` | U+2565 |
| `double-down-horizontal` | `╦` | U+2566 |
| `up-single-horizontal-double` | `╧` | U+2567 |
| `up-double-horizontal-single` | `╨` | U+2568 |
| `double-up-horizontal` | `╩` | U+2569 |
| `vertical-single-horizontal-double` | `╪` | U+256A |
| `vertical-double-horizontal-single` | `╫` | U+256B |
| `double-vertical-horizontal` | `╬` | U+256C |
| `light-arc-down-right` | `╭` | U+256D |
| `light-arc-down-left` | `╮` | U+256E |
| `light-arc-up-left` | `╯` | U+256F |
| `light-arc-up-right` | `╰` | U+2570 |
| `light-diagonal-upper-right-lower-left` | `╱` | U+2571 |
| `light-diagonal-upper-left-lower-right` | `╲` | U+2572 |
| `light-diagonal-cross` | `╳` | U+2573 |
| `light-left` | `╴` | U+2574 |
| `light-up` | `╵` | U+2575 |
| `light-right` | `╶` | U+2576 |
| `light-down` | `╷` | U+2577 |
| `heavy-left` | `╸` | U+2578 |
| `heavy-up` | `╹` | U+2579 |
| `heavy-right` | `╺` | U+257A |
| `heavy-down` | `╻` | U+257B |
| `heavy-left-light-right` | `╼` | U+257C |
| `heavy-right-light-left` | `╽` | U+257D |
| `heavy-up-light-down` | `╾` | U+257E |
| `heavy-down-light-up` | `╿` | U+257F |

---

## `block-elements` · U+2580–U+259F · `single`

| Token | Char | Unicode |
| --- | --- | --- |
| `upper-half-block` | `▀` | U+2580 |
| `lower-one-eighth-block` | `▁` | U+2581 |
| `lower-one-quarter-block` | `▂` | U+2582 |
| `lower-three-eighths-block` | `▃` | U+2583 |
| `lower-half-block` | `▄` | U+2584 |
| `lower-five-eighths-block` | `▅` | U+2585 |
| `lower-three-quarters-block` | `▆` | U+2586 |
| `lower-seven-eighths-block` | `▇` | U+2587 |
| `full-block` | `█` | U+2588 |
| `left-seven-eighths-block` | `▉` | U+2589 |
| `left-three-quarters-block` | `▊` | U+258A |
| `left-five-eighths-block` | `▋` | U+258B |
| `left-half-block` | `▌` | U+258C |
| `left-three-eighths-block` | `▍` | U+258D |
| `left-one-quarter-block` | `▎` | U+258E |
| `left-one-eighth-block` | `▏` | U+258F |
| `right-half-block` | `▐` | U+2590 |
| `light-shade` | `░` | U+2591 |
| `medium-shade` | `▒` | U+2592 |
| `dark-shade` | `▓` | U+2593 |
| `upper-one-eighth-block` | `▔` | U+2594 |
| `right-one-eighth-block` | `▕` | U+2595 |
| `quadrant-lower-left` | `▖` | U+2596 |
| `quadrant-lower-right` | `▗` | U+2597 |
| `quadrant-upper-left` | `▘` | U+2598 |
| `quadrant-upper-left-lower-left-lower-right` | `▙` | U+2599 |
| `quadrant-upper-left-lower-right` | `▚` | U+259A |
| `quadrant-upper-left-upper-right-lower-left` | `▛` | U+259B |
| `quadrant-upper-left-upper-right-lower-right` | `▜` | U+259C |
| `quadrant-upper-right` | `▝` | U+259D |
| `quadrant-upper-right-lower-left` | `▞` | U+259E |
| `quadrant-upper-right-lower-left-lower-right` | `▟` | U+259F |

---

## `geometric-shapes` · U+25A0–U+25FF · `single`

| Token | Char | Unicode |
| --- | --- | --- |
| `black-square` | `■` | U+25A0 |
| `white-square` | `□` | U+25A1 |
| `white-square-rounded` | `▢` | U+25A2 |
| `white-square-bullet` | `▣` | U+25A3 |
| `square-horizontal-fill` | `▤` | U+25A4 |
| `square-vertical-fill` | `▥` | U+25A5 |
| `square-orthogonal-crosshatch-fill` | `▦` | U+25A6 |
| `square-upper-left-lower-right-fill` | `▧` | U+25A7 |
| `square-upper-right-lower-left-fill` | `▨` | U+25A8 |
| `square-diagonal-fill` | `▩` | U+25A9 |
| `black-small-square` | `▪` | U+25AA |
| `white-small-square` | `▫` | U+25AB |
| `black-rectangle` | `▬` | U+25AC |
| `white-rectangle` | `▭` | U+25AD |
| `black-vertical-rectangle` | `▮` | U+25AE |
| `white-vertical-rectangle` | `▯` | U+25AF |
| `black-parallelogram` | `▰` | U+25B0 |
| `white-parallelogram` | `▱` | U+25B1 |
| `black-up-pointing-triangle` | `▲` | U+25B2 |
| `white-up-pointing-triangle` | `△` | U+25B3 |
| `black-up-pointing-small-triangle` | `▴` | U+25B4 |
| `white-up-pointing-small-triangle` | `▵` | U+25B5 |
| `black-right-pointing-pointer` | `▶` | U+25B6 |
| `white-right-pointing-pointer` | `▷` | U+25B7 |
| `black-right-pointing-small-triangle` | `▸` | U+25B8 |
| `white-right-pointing-small-triangle` | `▹` | U+25B9 |
| `black-right-pointing-triangle` | `►` | U+25BA |
| `white-right-pointing-triangle` | `▻` | U+25BB |
| `black-down-pointing-triangle` | `▼` | U+25BC |
| `white-down-pointing-triangle` | `▽` | U+25BD |
| `black-down-pointing-small-triangle` | `▾` | U+25BE |
| `white-down-pointing-small-triangle` | `▿` | U+25BF |
| `black-left-pointing-triangle` | `◀` | U+25C0 |
| `white-left-pointing-triangle` | `◁` | U+25C1 |
| `black-left-pointing-small-triangle` | `◂` | U+25C2 |
| `white-left-pointing-small-triangle` | `◃` | U+25C3 |
| `black-left-pointing-pointer` | `◄` | U+25C4 |
| `white-left-pointing-pointer` | `◅` | U+25C5 |
| `black-diamond` | `◆` | U+25C6 |
| `white-diamond` | `◇` | U+25C7 |
| `white-diamond-containing-black-small-diamond` | `◈` | U+25C8 |
| `fisheye` | `◉` | U+25C9 |
| `bullseye` | `◎` | U+25CE |
| `black-circle` | `●` | U+25CF |
| `white-circle` | `○` | U+25CB |
| `dotted-circle` | `◌` | U+25CC |
| `circle-with-vertical-fill` | `◍` | U+25CD |
| `black-circle-with-white-dot-right` | `◐` | U+25D0 |
| `black-circle-with-white-dot-left` | `◑` | U+25D1 |
| `black-circle-with-white-dot-upper` | `◒` | U+25D2 |
| `black-circle-with-white-dot-lower` | `◓` | U+25D3 |
| `white-circle-with-upper-right-quadrant` | `◔` | U+25D4 |
| `circle-all-but-upper-left-quadrant` | `◕` | U+25D5 |
| `left-half-black-circle` | `◖` | U+25D6 |
| `right-half-black-circle` | `◗` | U+25D7 |
| `inverse-bullseye` | `◘` | U+25D8 |
| `inverse-white-circle` | `◙` | U+25D9 |
| `upper-half-inverse-white-circle` | `◚` | U+25DA |
| `lower-half-inverse-white-circle` | `◛` | U+25DB |
| `upper-left-quadrant-circular-arc` | `◜` | U+25DC |
| `upper-right-quadrant-circular-arc` | `◝` | U+25DD |
| `lower-right-quadrant-circular-arc` | `◞` | U+25DE |
| `lower-left-quadrant-circular-arc` | `◟` | U+25DF |
| `upper-half-circle` | `◠` | U+25E0 |
| `lower-half-circle` | `◡` | U+25E1 |
| `white-lozenge` | `◊` | U+25CA |
| `white-bullet` | `◦` | U+25E6 |
| `black-medium-small-square` | `◾` | U+25FE |
| `white-medium-small-square` | `◽` | U+25FD |
| `black-medium-square` | `◼` | U+25FC |
| `white-medium-square` | `◻` | U+25FB |

---

## `braille-patterns` · U+2800–U+28FF · `single`

256 tokens. Blank base: `⠀` (U+2800). Each token encodes an 8-dot bitmap in a 2×4 cell:

```
(1) (4)
(2) (5)
(3) (6)
(7) (8)
```

Dot *n* set → add 2^(n−1) to U+2800. All combinations U+2800–U+28FF are valid tokens.

| Token | Char | Unicode |
| --- | --- | --- |
| `braille-blank` | `⠀` | U+2800 |
| `braille-dots-1` | `⠁` | U+2801 |
| `braille-dots-1-2` | `⠃` | U+2803 |
| `braille-dots-1-2-4-7` | `⠇` | U+2807 |
| `braille-dots-1-2-3-4-5-6-7` | `⠿` | U+283F |
| `braille-dots-1-2-3-4-5-6-7-8` | `⣿` | U+28FF |

---

## `arrows` · U+2190–U+21FF · `extended`

| Token | Char | Unicode |
| --- | --- | --- |
| `leftwards-arrow` | `←` | U+2190 |
| `upwards-arrow` | `↑` | U+2191 |
| `rightwards-arrow` | `→` | U+2192 |
| `downwards-arrow` | `↓` | U+2193 |
| `left-right-arrow` | `↔` | U+2194 |
| `up-down-arrow` | `↕` | U+2195 |
| `north-west-arrow` | `↖` | U+2196 |
| `north-east-arrow` | `↗` | U+2197 |
| `south-east-arrow` | `↘` | U+2198 |
| `south-west-arrow` | `↙` | U+2199 |
| `leftwards-double-arrow` | `⇐` | U+21D0 |
| `upwards-double-arrow` | `⇑` | U+21D1 |
| `rightwards-double-arrow` | `⇒` | U+21D2 |
| `downwards-double-arrow` | `⇓` | U+21D3 |
| `left-right-double-arrow` | `⇔` | U+21D4 |
| `long-leftwards-arrow` | `⟵` | U+27F5 |
| `long-rightwards-arrow` | `⟶` | U+27F6 |
| `long-left-right-arrow` | `⟷` | U+27F7 |

---

## `mathematical-operators` · U+2200–U+22FF · `extended`

| Token | Char | Unicode |
| --- | --- | --- |
| `multiplication-sign` | `×` | U+00D7 |
| `division-sign` | `÷` | U+00F7 |
| `plus-minus-sign` | `±` | U+00B1 |
| `almost-equal-to` | `≈` | U+2248 |
| `not-equal-to` | `≠` | U+2260 |
| `less-than-or-equal-to` | `≤` | U+2264 |
| `greater-than-or-equal-to` | `≥` | U+2265 |
| `infinity` | `∞` | U+221E |
| `n-ary-summation` | `∑` | U+2211 |
| `square-root` | `√` | U+221A |
| `ring-operator` | `∘` | U+2218 |

---

## `miscellaneous-symbols` · U+2600–U+26FF · `extended`

| Token | Char | Unicode |
| --- | --- | --- |
| `sun` | `☀` | U+2600 |
| `cloud` | `☁` | U+2601 |
| `umbrella` | `☂` | U+2602 |
| `snowman` | `☃` | U+2603 |
| `comet` | `☄` | U+2604 |
| `black-star` | `★` | U+2605 |
| `white-star` | `☆` | U+2606 |
| `telephone` | `☎` | U+260E |
| `white-telephone` | `☏` | U+260F |
| `skull-and-crossbones` | `☠` | U+2620 |
| `radioactive-sign` | `☢` | U+2622 |
| `biohazard-sign` | `☣` | U+2623 |
| `black-spade-suit` | `♠` | U+2660 |
| `black-club-suit` | `♣` | U+2663 |
| `black-heart-suit` | `♥` | U+2665 |
| `black-diamond-suit` | `♦` | U+2666 |
| `white-spade-suit` | `♤` | U+2664 |
| `white-heart-suit` | `♡` | U+2661 |
| `white-diamond-suit` | `♢` | U+2662 |
| `white-club-suit` | `♧` | U+2667 |
| `eighth-note` | `♪` | U+266A |
| `beamed-eighth-notes` | `♫` | U+266B |
| `warning-sign` | `⚠` | U+26A0 |
| `high-voltage-sign` | `⚡` | U+26A1 |
| `gear` | `⚙` | U+2699 |

---

## `dingbats` · U+2700–U+27BF · `extended`

| Token | Char | Unicode |
| --- | --- | --- |
| `black-scissors` | `✂` | U+2702 |
| `lower-right-pencil` | `✎` | U+270E |
| `check-mark` | `✓` | U+2713 |
| `heavy-check-mark` | `✔` | U+2714 |
| `ballot-x` | `✗` | U+2717 |
| `heavy-ballot-x` | `✘` | U+2718 |
| `eight-pointed-black-star` | `✦` | U+2726 |
| `eight-pointed-pinwheel-star` | `✧` | U+2727 |
| `stress-outlined-white-star` | `✩` | U+2729 |
| `circled-white-star` | `✪` | U+272A |
| `snowflake` | `❄` | U+2744 |
| `heavy-black-heart` | `❤` | U+2764 |
| `airplane` | `✈` | U+2708 |
| `envelope` | `✉` | U+2709 |

---

## `miscellaneous-technical` · U+2300–U+23FF · `extended`

| Token | Char | Unicode |
| --- | --- | --- |
| `diameter-sign` | `⌀` | U+2300 |
| `house` | `⌂` | U+2302 |
| `position-indicator` | `⌖` | U+2316 |

---

## `supplemental-symbols` · U+2B00–U+2BFF · `extended`

| Token | Char | Unicode |
| --- | --- | --- |
| `black-large-square` | `⬛` | U+2B1B |
| `white-large-square` | `⬜` | U+2B1C |

---

## `latin-1-supplement` · U+00A0–U+00FF · `extended`

| Token | Char | Unicode |
| --- | --- | --- |
| `no-break-space` | ` ` | U+00A0 |
| `inverted-exclamation` | `¡` | U+00A1 |
| `cent-sign` | `¢` | U+00A2 |
| `pound-sign` | `£` | U+00A3 |
| `currency-sign` | `¤` | U+00A4 |
| `yen-sign` | `¥` | U+00A5 |
| `broken-bar` | `¦` | U+00A6 |
| `section-sign` | `§` | U+00A7 |
| `diaeresis` | `¨` | U+00A8 |
| `copyright-sign` | `©` | U+00A9 |
| `feminine-ordinal` | `ª` | U+00AA |
| `left-pointing-double-angle` | `«` | U+00AB |
| `not-sign` | `¬` | U+00AC |
| `soft-hyphen` | `­` | U+00AD |
| `registered-sign` | `®` | U+00AE |
| `macron` | `¯` | U+00AF |
| `degree-sign` | `°` | U+00B0 |
| `plus-minus-sign` | `±` | U+00B1 |
| `superscript-two` | `²` | U+00B2 |
| `superscript-three` | `³` | U+00B3 |
| `acute-accent` | `´` | U+00B4 |
| `micro-sign` | `µ` | U+00B5 |
| `pilcrow-sign` | `¶` | U+00B6 |
| `middle-dot` | `·` | U+00B7 |
| `cedilla` | `¸` | U+00B8 |
| `superscript-one` | `¹` | U+00B9 |
| `masculine-ordinal` | `º` | U+00BA |
| `right-pointing-double-angle` | `»` | U+00BB |
| `vulgar-fraction-one-quarter` | `¼` | U+00BC |
| `vulgar-fraction-one-half` | `½` | U+00BD |
| `vulgar-fraction-three-quarters` | `¾` | U+00BE |
| `inverted-question-mark` | `¿` | U+00BF |
| `multiplication-sign` | `×` | U+00D7 |
| `division-sign` | `÷` | U+00F7 |
| `dagger` | `†` | U+2020 |
| `double-dagger` | `‡` | U+2021 |
| `bullet` | `•` | U+2022 |
| `triangular-bullet` | `‣` | U+2023 |
| `trade-mark-sign` | `™` | U+2122 |

---

## `excluded`

Not in this token set.

| Category | Unicode ranges / notes |
| --- | --- |
| Control characters | U+0000–U+001F, U+007F |
| Combining marks | U+0300–U+036F and related |
| CJK | U+4E00–U+9FFF and related blocks |
| Hangul / Kana | U+AC00–U+D7AF, U+3040–U+30FF |
| Emoji | U+1F300–U+1FAFF and related |
| Regional indicators | U+1F1E6–U+1F1FF |
| Variation selectors | U+FE00–U+FE0F |
| Private use | U+E000–U+F8FF |

---

## Index

| Set | Range | Width |
| --- | --- | --- |
| `basic-latin` | U+0020–U+007E | `single` |
| `box-drawing` | U+2500–U+257F | `single` |
| `block-elements` | U+2580–U+259F | `single` |
| `geometric-shapes` | U+25A0–U+25FF | `single` |
| `braille-patterns` | U+2800–U+28FF | `single` |
| `miscellaneous-technical` | U+2300–U+23FF | `extended` |
| `arrows` | U+2190–U+21FF | `extended` |
| `mathematical-operators` | U+2200–U+22FF | `extended` |
| `miscellaneous-symbols` | U+2600–U+26FF | `extended` |
| `dingbats` | U+2700–U+27BF | `extended` |
| `supplemental-symbols` | U+2B00–U+2BFF | `extended` |
| `latin-1-supplement` | U+00A0–U+00FF | `extended` |
