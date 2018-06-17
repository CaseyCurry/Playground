import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WidgetsService } from './widgets/widgets.service';
import { BootstrapService } from './widgets/bootstrap.service';

import { AppComponent } from './app.component';
import { PanelComponent } from './widgets/panel/panel.component';
import { PanelControlsComponent } from './widgets/panel-controls/panel-controls.component';
import { SpacerComponent } from './widgets/spacer/spacer.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { WidgetControlsComponent } from './widgets/widget-controls/widget-controls.component';
import { LibraryComponent } from './widgets/library/library.component';
import { DropTargetComponent } from './widgets/drop-target/drop-target.component';
import { ResizeGuidelineComponent } from './widgets/resize-guideline/resize-guideline.component';
import { LayoutEditorComponent } from './widgets/layout-editor/layout-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    SpacerComponent,
    PanelControlsComponent,
    WidgetComponent,
    WidgetControlsComponent,
    LibraryComponent,
    DropTargetComponent,
    ResizeGuidelineComponent,
    LayoutEditorComponent
  ],
  imports: [BrowserModule],
  providers: [WidgetsService, BootstrapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
