import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasksAiAnalysisComponent } from './tasks-ai-analysis.component';

describe('TasksAiAnalysisComponent', () => {
  let component: TasksAiAnalysisComponent;
  let fixture: ComponentFixture<TasksAiAnalysisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksAiAnalysisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksAiAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
