import React, { useState, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { RiPercentLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import { data } from '../API/ItemsData';
import { Formik, Form, Field } from 'formik';



const AddTax = () => {


  const [ItemsData, setItemsData] = useState([])
  const [Categories, setCategories] = useState([])
  const [CategorylessItems, setCategorylessItems] = useState([])
  const [CheckAll, setCheckAll] = useState(false)
  const [SingleCatCheck, setSingleCatCheck] = useState(false)
  const [SingleNonCatCheck, setSingleNonCatCheck] = useState(false)

  useEffect(() => {
    setItemsData(data)
    const temp = data.map((item) => item.category).filter(i => i !== undefined).filter((item, index, self) => {
      return self.findIndex((obj) => obj.name === item.name) === index;
    });

    let categoryless = data.filter(item => item.parent_id === null)
    setCategorylessItems(categoryless)
    setCategories(temp)

  }, [])

  const checkallitems = (e) => {

    setCheckAll(current => !current)
    const checkboxes2 = document.getElementById('custom-checkbox2')
    checkboxes2.checked = false

    const checkboxes = document.querySelectorAll('input[type="checkbox"][id="items_checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });

  }


  const singlecheckCategory = (e) => {
    setSingleCatCheck(c => !c)
  }

  const singlenoncategorycheck = () => {
    setSingleNonCatCheck(c => !c)
  }

  const SpecificCheckboxFun = () => {
    setCheckAll(false)
    const checkboxes = document.getElementById('custom-checkbox')
    checkboxes.checked = false

  }



  return (
    <>
      <Formik
        initialValues={{ Name: '', Rate: 0, Applied_to: CheckAll ? "all" : "some" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (


          <Form onSubmit={handleSubmit} className='px-40 py-20 '>
            <div className='flex justify-between '>
              <h1 className='text-2xl font-semibold text-[#363636]'>Add Tax</h1>
              <i><RxCross2 className='w-8 h-8 text-[#474747]' /></i>
            </div>

            <div className='w-2/3 mt-5 flex justify-between gap-4 '>
              {/* NAME FIELD */}
              <div className='w-3/4 border-2 border-[#EAEAEA] rounded-md px-2'>
                <Field
                  // value={Name} onChange={(e)=>setName(e.target.value)}
                  name="Name"
                  type="text" placeholder='Name' className='!outline-none focus:ring-0 w-full h-10' />
              </div>

              {/* RATE FIELD */}
              <div className='w-1/4 border-2 border-[#EAEAEA] rounded-md flex px-2 justify-between'>
                <Field type="number" name="Rate" placeholder='Number' className='!outline-none h-10 w-full' />
                <i className='self-center'><RiPercentLine className='self-center text-[#868686]' /></i>
              </div>
            </div>

            <div className='mt-5 pl-2' >
              <div className='flex w-full gap-2' onClick={checkallitems} >
                <input type="checkbox" name="" id="custom-checkbox" className='rounded-checkbox
            w-4 h-4 justify-center self-center appearance-none border-2 rounded-full border-[#F16D36] checked:border-[#F16D36] checked:bg-[#F16D36] ' />
                <label for="custom-checkbox" onClick={checkallitems}>Apply to all items in collection</label>

              </div>

              <div className='flex w-full gap-2 mt-1'  >
                <input type="checkbox" name="" id="custom-checkbox2" className='w-4 h-4 justify-center self-center appearance-none border-2 rounded-full border-[#F16D36] checked:border-[#F16D36] checked:bg-[#F16D36]' />
                <label for="custom-checkbox2" onClick={SpecificCheckboxFun}>Apply to specific items</label>
              </div>
            </div>


            <hr className='mt-8' />
            {/* SEARCH CATEGORY */}
            <div className='w-1/4 flex mt-8 border-2 border-[#EAEAEA] py-2 px-1 rounded-md'>
              <i className='self-center'><CiSearch className='self-center text-[#868686]' /></i>
              <input type="text" placeholder='Search Items' className='!outline-none focus:ring-0 w-full pl-2 ' />
            </div>


            <div className='Parent_Item w-full'>
              {
                Categories.map((item) => (
                  <div>
                    {/* MAP SINGLE CATEGORY */}
                    <div className='bg-[#EEEEEE] mt-8 flex px-3 h-10 rounded-sm items-center gap-3'>
                      <input value={item.id} type="checkbox" id="items_checkbox" checked={CheckAll ? 1 : undefined}
                        onClick={singlecheckCategory}
                        className='w-4 h-4 justify-center self-center   rounded-full  ' />
                      <span>{item.name}</span>
                    </div>
                    {
                      // MAP THIS CATEGORY ITEMS
                      ItemsData.filter(i => i.parent_id !== null).map(item => (
                        <div className='child-items-div flex flex-col gap-4 pt-5'>
                          <div className='child-items ml-6 flex gap-3'>
                            <Field name='Applicable_items' value={item.id} type="checkbox" id="items_checkbox" checked={CheckAll || SingleCatCheck ? 1 : undefined} className='w-4 h-4 justify-center self-center rounded-full' />
                            <span>{item.name}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ))
              }
              {/* CHECKBOX OF NO CATEGORY ITEMS */}
              <div className='bg-[#EEEEEE] mt-8 flex px-3 h-10 rounded-sm items-center gap-3'>
                <input type="checkbox" name="" onClick={singlenoncategorycheck} id="items_checkbox" checked={CheckAll ? 1 : undefined} className='w-4 h-4 justify-center self-center rounded-full text-orange-500 border-orange-500 focus:ring-orange-500 ' />
              </div>
              {
                // LIST OF ITEMS THAT HAVE NO CATEGORY
                CategorylessItems.map((item) => (
                  <div className='child-items-div flex flex-col gap-4 pt-5'>
                    <div className='child-items ml-6 flex gap-3'>
                      <Field name='Applicable_items' value={item.id} type="checkbox" id="items_checkbox" checked={CheckAll || SingleNonCatCheck ? 1 : undefined} className='w-4 h-4 justify-center self-center   rounded-full text-orange-500 border-orange-500 focus:ring-orange-500' />
                      <span>{item.name}</span>
                    </div>
                  </div>


                ))
              }

            </div>
            <hr className='mt-20' />
            <div class="p-2 w-full flex justify-end">
              <button type='submit' class="flex   text-white bg-[#F16D36] border-0 py-2 px-8 focus:outline-none hover:bg-[#f06226] rounded text-lg w-fit">Apply Tax to 6 Items</button>
            </div>
          </Form>

        )}
      </Formik>


    </>
  )
}

export default AddTax