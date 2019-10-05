import { Pipe, PipeTransform } from "@angular/core";

declare var Liferay: any;

@Pipe({ name: 'liferayTranslate' })
export class LiferayTranslatePipe implements PipeTransform {
    transform(key: string): string {
        return Liferay.Language.get(key);
    }

}
