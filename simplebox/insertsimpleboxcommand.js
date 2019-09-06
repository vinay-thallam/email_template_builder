import Command from '@ckeditor/ckeditor5-core/src/command';

// A command is a combination of an action and a state. You can interact with most of the editor features by commands that they expose. This allows not only executing these features (e.g. bolding a fragment of text) but also checking if this action can be executed in the selection’s current location as well as observing other state properties (such as whether the currently selected text is bolded).

export default class InsertSimpleBoxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer ) {
    const simpleBox = writer.createElement( 'simpleBox' );
    const simpleBoxTitle = writer.createElement( 'simpleBoxTitle' );
    const simpleBoxDescription = writer.createElement( 'simpleBoxDescription' );

    const placeholder = writer.createElement( 'placeholder', { name: 'date' } );

    writer.append( placeholder, simpleBoxTitle );
    writer.append( simpleBoxTitle, simpleBox );
    writer.append( simpleBoxDescription, simpleBox );

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', simpleBoxDescription );

    return simpleBox;
}