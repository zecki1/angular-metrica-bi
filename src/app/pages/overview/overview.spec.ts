import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OverviewPage } from './overview';

describe('OverviewPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverviewPage],
      providers: [provideRouter([])],
    });
  });

  it('deve criar e expor o título da página', () => {
    const fixture = TestBed.createComponent(OverviewPage);
    expect(fixture.componentInstance.titulo).toBe('Overview');
  });
});
