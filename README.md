# Wallpapers Hub — GitHub Pages + Upload por Issues

Site de papéis de parede com **upload público** usando **Issues + GitHub Actions** (sem servidor).
As imagens viram arquivos em `/wallpapers` e a galeria lê `wallpapers/index.json`.

## Como usar

1. Edite **assets/js/config.js**:
   ```js
   window.WALL_CFG = { owner: "SEU_USUARIO_GITHUB", repo: "SEU_REPOSITORIO" };
   ```
2. Faça push para um repositório **público** e ative **GitHub Pages** (branch `main`, pasta `/ (root)`).
3. Em **Settings → Actions → General**, marque **Read and write permissions**.
4. Abra o site e clique em **Enviar imagem** → anexe PNG/JPG/WEBP/GIF e envie o issue.
5. O Action baixa as imagens, salva em `/wallpapers`, atualiza `wallpapers/index.json` e faz commit.

## Estrutura
```
.
├── index.html
├── sobre.html
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   └── js/config.js
├── wallpapers/
│   └── index.json   (gerado/atualizado pelo Action)
└── .github/
    ├── ISSUE_TEMPLATE/upload.yml
    └── workflows/ingest-issues.yml
```

### Dicas
- Para moderar, exija aprovação de issues de novos usuários nas configurações do repositório.
- Renomeie arquivos no PR/commit se quiser organizar por pastas (ex.: `/wallpapers/4k/`).
