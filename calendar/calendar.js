import CalendarEditing from './calendarediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Calendar extends Plugin {
    static get requires() {
        return [ CalendarEditing ];
    }
}
