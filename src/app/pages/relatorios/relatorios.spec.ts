import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RelatoriosPage } from './relatorios';

describe('RelatoriosPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RelatoriosPage],
      providers: [provideRouter([])],
    });
  });

  it('deve criar e expor o título da página', () => {
    const fixture = TestBed.createComponent(RelatoriosPage);
    expect(fixture.componentInstance.titulo).toBe('Relatorios');
  });
});
