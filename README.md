# Stroke Code MRI prototype

An interactive, synthetic design prototype for the **NEURO Limited Hyperacute Stroke MRI Panel**. It demonstrates the proposed Thrombolytic, EVT, and combined decision branches, including generated MRI/MRA orders, order-level diagnosis association, MRI safety-screening options, attending approval, and a New Orders review.

> **Public design prototype only.** It uses synthetic data, is not connected to Epic or another clinical system, and cannot place or transmit orders. It is not for patient care.

## View the prototype

[Open the GitHub Pages prototype](https://rkalani1.github.io/stroke-code-MRI/)

Use the query parameter `demo` to open a prepared state: `blank`, `thrombolytic`, `evt`, `evt-brain`, `both`, `unable-to-screen`, or `review`.

## Run locally

Prerequisite: Node.js 22 or later.

```bash
npm ci
npm run dev
```

No API key, backend, or clinical-system connection is required.

## Verify a change

```bash
npm run lint
npm run build
```

The `main` branch deploys automatically to GitHub Pages after both checks pass.
