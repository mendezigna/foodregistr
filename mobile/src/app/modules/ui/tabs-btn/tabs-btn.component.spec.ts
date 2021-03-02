import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsBtnComponent } from './tabs-btn.component';

describe('TabsBtnComponent', () => {
  let component: TabsBtnComponent;
  let fixture: ComponentFixture<TabsBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsBtnComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
