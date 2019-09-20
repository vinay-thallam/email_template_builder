import Command from '@ckeditor/ckeditor5-core/src/command';

// A command is a combination of an action and a state. You can interact with most of the editor features by commands that they expose. This allows not only executing these features (e.g. bolding a fragment of text) but also checking if this action can be executed in the selection’s current location as well as observing other state properties (such as whether the currently selected text is bolded).

export default class InsertCalendar extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createCalendar( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'calendar' );

        this.isEnabled = allowedIn !== null;
    }
}

function createCalendar( writer ) {
    const calendar = writer.createElement( 'calendar' );
    const calendarTitle = writer.createElement( 'calendarTitle' );
    const calendarDescription = writer.createElement( 'calendarDescription' );
    const calendarLineOne = writer.createElement( 'calendarLineOne' );
    const calendarLineTwo = writer.createElement( 'calendarLineTwo' );

    const day = writer.createElement( 'placeholder', { name: 'day' } );
    const month = writer.createElement( 'placeholder', { name: 'month' } );
    const date = writer.createElement( 'placeholder', { name: 'date' } );

    writer.append( day, calendarTitle );
    writer.append( month, calendarLineOne );
    writer.append( date, calendarLineTwo );

    writer.append( calendarLineOne, calendarDescription );
    writer.append( calendarLineTwo, calendarDescription );

    writer.append( calendarTitle, calendar );
    writer.append( calendarDescription, calendar );
    
    // writer.appendElement( 'paragraph', simpleBoxDescription );

    return calendar;
}