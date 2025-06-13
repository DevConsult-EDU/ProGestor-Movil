import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiskAnalysisWidgetComponent } from './risk-analysis-widget.component';

describe('RiskAnalysisWidgetComponent', () => {
  let component: RiskAnalysisWidgetComponent;
  let fixture: ComponentFixture<RiskAnalysisWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAnalysisWidgetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiskAnalysisWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
