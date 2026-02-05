import { BehaviorSubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { useEffect, useState } from 'react';
import { BuilderActions } from '../actions/builder.actions';

function useElementValues(elementId: string) {

  const [values, setValues] = useState({
    fontSize: 'base',
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textColor: 'black',
    textAlign: 'left',
  });

  useEffect(() => {

    const subject = new BehaviorSubject(elementId);

    const subscription = subject
      .pipe(throttleTime(100)) 
      .subscribe((id) => {
        const textValue = BuilderActions.getValue(id, 'text-') || '';
        setValues({
          fontSize: textValue || 'base',
          textColor: textValue || 'black',
          textAlign: textValue || 'left',
          fontWeight: BuilderActions.getValue(id, 'font-') || 'normal',
          lineHeight: BuilderActions.getValue(id, 'leading-') || 'normal',
          letterSpacing: BuilderActions.getValue(id, 'tracking-') || 'normal',
        });
      });

    // Cleanup
    return () => subscription.unsubscribe();
  }, [elementId]);

  return values;
}

export default useElementValues