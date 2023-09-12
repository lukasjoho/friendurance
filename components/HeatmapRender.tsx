'use client';
import { cn } from '@/lib/utils';
import { default as ReactHeatMap } from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { FC } from 'react';
import Container from './Container';

interface HeatmapRenderProps {
  value: any;
}

function toObject(values: any) {
  return JSON.parse(
    JSON.stringify(
      values,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
  );
}

const HeatmapRender: FC<HeatmapRenderProps> = ({ value }) => {
  const maxCount = Math.max(...value.map((activity: any) => activity.count));
  const fullColor: string = '#09090b';
  let opacity = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const mapCountToIndex = (currentCount: number, maxCount: number) => {
    let opacityIndex = Math.ceil((currentCount / maxCount) * opacity.length);
    if (opacityIndex === 0) opacityIndex = 1;
    const opacityValue = opacity[opacityIndex - 1];

    return String(opacityValue);
  };
  //generate color object with value - color pairs
  const generatePanelColors = (maxCount: number) => {
    const panelColors: { [key: number]: string } = {};
    for (let i = 0; i <= maxCount; i++) {
      let opacityValue = mapCountToIndex(i, maxCount);
      if (opacityValue === '100') {
        opacityValue = '';
      }
      panelColors[`${i}`] = `${fullColor}${opacityValue}`;
    }
    return panelColors;
  };
  const panelCols = generatePanelColors(maxCount);
  return (
    <div className="w-full">
      <Container>
        <ReactHeatMap
          value={value}
          className="h-64 w-full"
          weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          startDate={new Date('2023/01/01')}
          endDate={new Date()}
          rectSize={16}
          rectProps={{
            rx: 4,
          }}
          panelColors={panelCols}
          rectRender={(props, data) => {
            return (
              <Tooltip
                placement="top"
                content={`Activity Count: ${data.count ?? 0}`}
              >
                <rect
                  {...props}
                  className={cn('', !data.count && 'fill-zinc-50')}
                />
              </Tooltip>
            );
          }}
        />
      </Container>
    </div>
  );
};

export default HeatmapRender;
