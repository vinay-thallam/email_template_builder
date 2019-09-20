import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertCalendar from './command'

export default class CalendarEditing extends Plugin {
    init() {
        console.log( 'CalendarEditing#init() got called' );
        this._defineSchema();       
        this._defineConverters();

        this.editor.commands.add( 'insertCalendar', new InsertCalendar( this.editor ) );
    }

    _defineSchema() {             

        // Code in this funcition is to define the schema for the markup below,
        // <calendar>
        //     <calendarTitle></calendarTitle>
        //     <calendarDescription>
        //          <calendarLineOne></calendarLineOne>
        //          <calendarLineTwo></calendarLineTwo>
        //     </calendarDescription>
        // </calendar>



        const schema = this.editor.model.schema;

        schema.register( 'calendar', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'calendarTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'calendar',
            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'calendarDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'calendar',
            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        } );

        schema.register( 'calendarLineOne', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'calendarDescription',
            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        } );

        schema.register( 'calendarLineTwo', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'calendarDescription',
            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        } );
    }

    _defineConverters() {

        // Actual structure we want to achieve in the DOM is as below. This function defines the converters to do the same.
        // <div class="calendar">
        //     <div class="cal-title">Monday</div>
        //     <div class="cal-desc">
        //         <div class="cal-line-one">May</div>
        //         <div class="cal-line-two">12</div>
        //     </div>
        // </div>


        //These converters are too verbose and long. Check this ticket for improvement. https://github.com/ckeditor/ckeditor5/issues/1228

        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'calendar',
            view: {
                name: 'div',
                classes: 'calendar'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'calendar',
            view: {
                name: 'div',
                classes: 'calendar'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'calendar',
            view: ( modelElement, viewWriter ) => {
                const section = viewWriter.createContainerElement( 'div', { class: 'calendar' } );

                return toWidget( section, viewWriter, { label: 'calendar widget' } );
            }
        } );

        // <simpleBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'calendarTitle',
            view: {
                name: 'div',
                classes: 'cal-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'calendarTitle',
            view: {
                name: 'div',
                classes: 'cal-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'calendarTitle',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement( 'div', { class: ' cal-title' } );

                return toWidgetEditable( h1, viewWriter );
            }
        } );

        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'calendarDescription',
            view: {
                name: 'div',
                classes: 'cal-desc'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'calendarDescription',
            view: {
                name: 'div',
                classes: 'cal-desc'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'calendarDescription',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'cal-desc' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );        

        conversion.for( 'upcast' ).elementToElement( {
            model: 'calendarDescription',
            view: {
                name: 'div',
                classes: 'cal-desc'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'calendarDescription',
            view: {
                name: 'div',
                classes: 'cal-desc'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'calendarDescription',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'cal-desc' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );        

        conversion.for( 'upcast' ).elementToElement( {
            model: 'calendarLineOne',
            view: {
                name: 'div',
                classes: 'cal-line-one'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'calendarLineOne',
            view: {
                name: 'div',
                classes: 'cal-line-one'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'calendarLineOne',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'cal-line-one' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );        

        conversion.for( 'upcast' ).elementToElement( {
            model: 'calendarLineTwo',
            view: {
                name: 'div',
                classes: 'cal-line-two'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'calendarLineTwo',
            view: {
                name: 'div',
                classes: 'cal-line-two'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'calendarLineTwo',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'cal-line-two' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );        

        
    }
}