import React, { useEffect, useState } from 'react';
import Button from '../components/common/CustomButton';
import FunnelGraph from '../components/common/FunnelGrapgh';
import Charts from '../components/Charts';
import { supabase } from '../supabaseClient';
import { buttonsGroup } from '../utils/utils';
import { Store, UpdateStore } from '../context/store';

const Dashboard = () => {
  const [activeButtonId, setActiveButtonId] = useState(1);
  const store = Store();
  const update = UpdateStore();

  const getFunnelData = async (month = 1) => {
    const { data, error } = await supabase
      .from('funnel_data')
      .select('*')
      .eq('month', month);

    if (error) {
      console.error('Error fetching funnel data:', error);
    } else {
      update({ selectedData: data[0] });
    }
  };

  const handleButtonClick = (id) => {
    setActiveButtonId(id);
    getFunnelData(id);
  };

  useEffect(() => {
    getFunnelData();
  }, []);

  useEffect(() => {
    supabase
      .channel('funnel_data')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
        },
        (payload) => {
          update({ selectedData: payload.new });
        }
      )
      .subscribe();
  }, []);

  return (
    <>
      <h1 className='text-primary-default text-4xl mb-6 lg:text-5xl font-bold lg:mb-8'>
        Dashboard
      </h1>
      <div className='btn-group flex gap-1 lg:gap-3 mb-6 lg:mb-9 overflow-x-auto'>
        {buttonsGroup.map((button) => (
          <Button
            key={button.id}
            variant={activeButtonId === button.id ? 'primary' : 'default'}
            size='small'
            type='button'
            onClick={() => handleButtonClick(button.id)}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <div className='funnel-graph border border-default-70 rounded-xl lg:py-7 mb-6'>
        {store?.selectedData && (
          <FunnelGraph
            containerId='dashboard-funnel-graph'
            data={store?.selectedData}
          />
        )}
      </div>
      <Charts />
    </>
  );
};

export default Dashboard;
