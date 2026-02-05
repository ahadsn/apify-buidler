import  { useMemo, useState } from 'react';
import { PageElement } from '../../elements/types/pageElement.types';
import { useDeviceType } from '../../hooks/useDeviceType';

import AdvancedEditor from './AdvancedEditor';
import LayoutEditor from './LayoutEditor';
import BorderEditor from './BorderEditor';
import BackgroundEditor from './BackgroundEditor';
import DimensionsEditor from './DimensionsEditor';
import SpacingEditor from './SpacingEditor';
import TypographyEditor from './TypographyEditor';
import ContentEditor from './ContentEditor';
import Section from './Section';
import PannelHeader from './PannelHeader';
import { BuilderActions } from '../../actions/builder.actions';
import { TailwindClassConfig } from '../../services/types/css.services.types';
import { classesType } from '../../store/builder.store';

interface PropertiesPanelProps {
    element: PageElement;
    classes:classesType
}
export type EditorProps = {
  element: PageElement;
  activeStyles: Record<string, TailwindClassConfig>;
};
export default function PropertiesPanel({ element,classes }: PropertiesPanelProps) {
    const deviceType = useDeviceType();
    const [expanded, setExpanded] = useState('');
    
    const activeStyles = useMemo(() => BuilderActions.getActiveStyle(element.id), [classes]) 
    const toggle = (input: string) => {
        input === expanded ? setExpanded('') : setExpanded(input);
    }
    
    return (
        <div className={`${deviceType=='pc'?'w-96':'w-72'} h-full bg-black/40 backdrop-blur-md border-l border-white/10 overflow-y-auto`}>
           
            <PannelHeader element={element}  activeStyles={activeStyles}/>
         
            <div className={`${deviceType=='pc'?'p-4 space-y-3':'p-2 space-y-2'}`}>
                <Section title="Content" expanded={expanded==="content"} onToggle={() => toggle('content')}>
                    <ContentEditor element={element}  activeStyles={activeStyles}/>
                </Section>

                {['heading', 'text', 'button', 'list'].includes(element.type) && (
                    <Section title="Typography" expanded={expanded==='typography'} onToggle={() => toggle('typography')}>
                        <TypographyEditor element={element} activeStyles={activeStyles} />
                    </Section>
                )}

                <Section title={deviceType=='pc'?"Spacing (Padding & Margin)":"Spacing"} expanded={expanded==='spacing'} onToggle={() => toggle('spacing')}>
                    <SpacingEditor element={element}  activeStyles={activeStyles}/>
                </Section>

                <Section title={deviceType=='pc'?"Dimensions (Width & Height)":"Dimensions"} expanded={expanded==='dimensions'} onToggle={() => toggle('dimensions')}>
                    <DimensionsEditor element={element}  activeStyles={activeStyles}/>
                </Section>

                <Section title={deviceType=='pc'?"Background & Colors":"Background"} expanded={expanded==='background'} onToggle={() => toggle('background')}>
                    <BackgroundEditor element={element}  activeStyles={activeStyles} />
                </Section>

                <Section title={deviceType=='pc'?"Border, Shadow & Effects":"Border & FX"} expanded={expanded==='border'} onToggle={() => toggle('border')}>
                    <BorderEditor element={element}  activeStyles={activeStyles}/>
                </Section>

                {(element.type === 'container' || element.type === 'grid' || element.type === 'hero') && (
                    <Section title={deviceType=='pc'?"Layout (Flex/Grid)":"Layout"} expanded={expanded==='layout'} onToggle={() => toggle('layout')}>
                        <LayoutEditor element={element}  activeStyles={activeStyles}/>
                    </Section>
                )}

                <Section title={deviceType=='pc'?"Advanced Styles":"Advanced"} expanded={expanded==='advanced'} onToggle={() => toggle('advanced')}>
                    <AdvancedEditor element={element}  activeStyles={activeStyles}/>
                </Section>
            </div>
        </div>
    );
}