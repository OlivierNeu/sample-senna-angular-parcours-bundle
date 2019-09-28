# Zone Assurance Vie - Gestion de la langue

Cette section décrit ce qui touche à la gestion de la langue au travers de l'application.

## Gestion de la traduction des libellés

### Stockage des libellés

Tous les textes de chaque applications Angular sont stockés dans des fichiers json, dans un répertoire /i18n.

Exemple :

    Lib commun : /src/i18n/commun-fr.json
    app sommaire : /src/assets/i18n/commun-fr.json


### Mécanique de copie/fusion des libellés

Pour que angular-cli puisse copier les fichiers .json dans le `/dist` lors de la compilation, les fichiers doivent se trouver dans le répetoire `/assets`. Ce répertoire se trouve copié tel quel dans le `/dist`.

Chaque application a donc son répertoire `/assets/i18n` contenant les fichiers json de libellés.

Par contre, l'application `commun` a elle aussi des fichiers de libellés pour certains composants communs, tel que les gabarits.
Pour que ces libellés soient considérés lors du build, il faut donc que ces libellés communs se retrouvent dans le répertoire `/assets/i18n` avant le début de la compilation.

Il y a donc une tâche gulp (`copy-assets-et-bundle-i18n`) en place qui s'exécutent en pre-build pour :
* Copier les fichiers json communs dans le répertoire `/assets/i18n`. 
* Fusionner les fichier json commun avec les fichiers json de l'application.


### Mécanique de traduction

La gestion de la traduction se fait en utilisant la librairie [ngx-translate](https://github.com/ngx-translate/core). 
Le TranslateService est initialisé avec la langue courante au chargement de chaque application grâce au code placé dans le I18nModule.
Ensuite, lors du chargement des components, les traductions sont récupérées du fichier json pour être remplacés dynamiquement.



## LanguageService

Service responsable d'abstraire la façon dont la langue est récupérée et gérée dans le système.

Présentement, la langue est stockée dans un cookie de session créé par le HttpModule de l'infrastructure.


