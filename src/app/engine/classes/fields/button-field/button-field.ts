import { Field } from 'src/app/engine/interfaces/field';
import { FieldType } from 'src/app/engine/enums/field-type.enum';

export class ButtonField implements Field {
    fieldType: string;
    constructor(public title: string, public buttonType: string, public onClick: () => void) {
        this.fieldType = FieldType.button;
    }
}
