# crp-nexus

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
## TO CREATE DATABASE

### CREATE TABLE EN TETE DEVIS 
```sql
CREATE TABLE en_tete_devis (
    id_devis SERIAL PRIMARY KEY,  -- Primary key with auto-increment
    numero_devis VARCHAR(50) NOT NULL,  -- Invoice number
	indice_devis VARCHAR(50) NOT NULL,
	etat_devis VARCHAR(255) NOT NULL,
	date_ouverture_devis DATE NOT NULL,
	date_appel_offres DATE NOT NULL,
	date_reponse_souhaitee DATE NOT NULL,
	limite_validitee DATE NOT NULL,
	ref_appel_offre VARCHAR(100) NOT NULL,
    date_devis DATE NOT NULL,  -- Invoice date
	duree_devis VARCHAR(40) NOT NULL,
	date_edition DATE NOT NULL,
    id_client VARCHAR(100) NOT NULL,  -- Client name
    montant_total DECIMAL(10, 2) NOT NULL  -- Total amount
	)
```