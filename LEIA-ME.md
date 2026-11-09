# Atlas Mobile

App web instalável (Android e iPhone) para conversar com o Atlas do notebook de qualquer lugar.
Conversa por voz ou texto, confirmações com Sim/Não, painel do notebook e as sessões do Claude Code.

O app fala com o Atlas pelo mesmo canal cifrado da Alexa (ntfy.sh). **Não há nenhuma chave nestes arquivos**:
a chave fica só no notebook e no celular, depois do pareamento.

## Publicar (uma vez) no GitHub Pages
1. github.com → New repository → nome `atlas-mobile` → Public → Create.
2. Add file → Upload files → arraste todos os arquivos desta pasta → Commit.
3. Settings → Pages → Branch `main`, pasta `/ (root)` → Save. Em 1–2 minutos o endereço aparece
   (algo como `https://SEU-USUARIO.github.io/atlas-mobile/`).

## Parear o celular
1. No notebook, rode `Parear_Celular.bat` (pasta do Atlas). Na primeira vez ele pergunta o endereço do app.
2. No celular chega uma notificação do ntfy: toque nela → o app abre já ligado ao Atlas.
   (Ou copie o código que aparece na tela e cole no app.)
3. Instale: Chrome (Android) → menu ⋮ → Instalar app. Safari (iPhone) → Compartilhar → Adicionar à Tela de Início.

## Atualizar (quando você editar algo)
1. No GitHub: Add file → Upload files → arraste os arquivos alterados (normalmente só `index.html`, às vezes `sw.js`) → Commit.
2. Em 1–2 minutos o app percebe sozinho: ao abrir, ao voltar para ele e a cada 10 min.
   O botão ⟳ no topo fica âmbar e aparece a faixa **NOVA VERSÃO DO APP** → toque em **Atualizar**.
3. Para forçar a qualquer momento: toque no ⟳ (diz se já está na mais nova) ou Ajustes → **Atualizar o app**.
A conversa e o pareamento continuam; não precisa parear de novo.
