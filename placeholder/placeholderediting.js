import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import './theme/placeholder.css';

export default class PlaceholderEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        console.log( 'PlaceholderEditing#init() got called' );
        this._defineSchema();   
        this._defineConverters();
    }

    _defineSchema() {

        //Below is the model structure we want to achieve
        // <placeholder name="name"></placeholder>

        const schema = this.editor.model.schema;

        schema.register( 'placeholder', {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // The placeholder will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and can be selected:
            isObject: true,

            // The placeholder can have many types, like date, name, surname, etc:
            allowAttributes: [ 'name' ]
        } );
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: [ 'placeholder' ]
            },
            model: ( viewElement, modelWriter ) => {
                // Extract the "name" from "{name}".
                const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

                return modelWriter.createElement( 'placeholder', { name } );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'placeholder',
            view: ( modelItem, viewWriter ) => {
                const widgetElement = createPlaceholderView( modelItem, viewWriter );

                // Enable widget handling on a placeholder element inside the editing view.
                return toWidget( widgetElement, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'placeholder',
            view: createPlaceholderView
        } );

        // Helper method for both downcast converters.
        function createPlaceholderView( modelItem, viewWriter ) {
            const name = modelItem.getAttribute( 'name' );

            const placeholderView = viewWriter.createContainerElement( 'span', {
                class: 'placeholder'
            } );

            // Insert the placeholder name (as a text).
            const innerText = viewWriter.createText( '{' + name + '}' );
            viewWriter.insert( viewWriter.createPositionAt( placeholderView, 0 ), innerText );

            return placeholderView;
        }
    }
}