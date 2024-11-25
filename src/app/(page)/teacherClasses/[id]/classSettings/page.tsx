import { Button } from '@/components/ui/button'
import React from 'react'

export default function ClassSetting() {
    return (
        <div className='w-full flex flex-col p-10 pt-0'>
            <div className='pt-10 pb-4'>
                <h2 className='font-bold text-lg'>Edit Class</h2>
                <p className='pt-2 pb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <Button style={{ backgroundColor: '#5048E5' }}>Edit Class</Button>
            </div>
            <hr></hr>
            <div className='pt-10'>
                <h2 className='font-bold text-lg'>Delete Class</h2>
                <p className='pt-2 pb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <Button style={{ backgroundColor: '#DC2828' }}>Delete Class</Button>
            </div>
        </div>

    )
}
