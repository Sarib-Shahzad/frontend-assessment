import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Draggable } from './common/Draggable';
import { LineChart } from './common/LineChart';

const Charts = () => {
  const [charts, setCharts] = useState([]);

  const fetchCharts = async () => {
    const { data, error } = await supabase
      .from('charts')
      .select('*')
      .order('order_sq', { ascending: true });

    if (error) {
      console.error('Error fetching charts:', error);
    } else {
      setCharts(data);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = charts.findIndex((chart) => chart.id === active.id);
      const newIndex = charts.findIndex((chart) => chart.id === over.id);
      const updatedCharts = arrayMove(charts, oldIndex, newIndex);
      setCharts(updatedCharts);

      try {
        await Promise.all(
          updatedCharts.map((chart, index) => {
            const updatedChart = {
              id: chart.id,
              order_sq: index,
              title: chart.title || '',
              data: chart.data,
              total_views: chart.total_views,
              sub_value: chart.sub_value,
            };

            return supabase
              .from('charts')
              .upsert(updatedChart)
              .eq('id', chart.id);
          })
        );
      } catch (error) {
        console.error('Error updating chart order in Supabase:', error);
      }
    }
  };

  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 10,
    },
  });

  const sensors = useSensors(pointerSensor, touchSensor);

  useEffect(() => {
    fetchCharts();
  }, []);

  useEffect(() => {
    if (charts.length > 0) {
      const updatedCharts = charts.map((chart) => ({
        ...chart,
        data: {
          ...chart.data,
          datasets: chart.data.datasets.map((dataset) => ({
            ...dataset,
            borderColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, '#74DFA2');
              gradient.addColorStop(1, '#0050d3');
              return gradient;
            },
          })),
        },
      }));

      setCharts(updatedCharts);
    }
  }, [charts.length]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={charts.map((chart) => chart.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className='line-chart-group grid md:grid-cols-2 items-center gap-4'>
          {charts.map((chart) => (
            <Draggable key={chart.id} id={chart.id}>
              <LineChart
                data={chart.data}
                title={chart.title}
                totalViews={chart.total_views}
                subValue={chart.sub_value}
              />
            </Draggable>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Charts;
