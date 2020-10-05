import React, { Component } from 'react'
  // function onSearch() {
  //   debugger
  //   if (search !== "" || search !== undefined) {
  //     _allItems = [];
  //     const url = `https://apiuat.actingoffice.com/Contacts?start=0&length=25&search=${search}`
  //     const headers = {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //     debugger
  //     axios
  //       .get(url, { headers })
  //       .then((res) => {
  //         debugger;
  //         console.log(res);
  //         if (res.data.status == true) {
  //           for (let i = 0; i < res.data.result.items.length; i++) {
  //             _allItems.push({
  //               key: i,
  //               name: res.data.result.items[i].name,
  //               sno: res.data.result.items[i].sno,
  //               leadId: res.data.result.items[i].leadId,
  //               phoneNumber: res.data.result.items[i].phoneNumber?.number,
  //               type: res.data.result.items[i].type,
  //               createdOn: res.data.result.items[i].createdOn,

  //             });
  //             setItem(_allItems);


  //           }

  //         }



  //       })
  //   }
  //   else {
  //     setItem(allitem);
  //   }
  // }

  // function _onFilter(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text?: string) {
  //   debugger;
  //   if (text === "" || text == undefined) {
  //     setItem(allitem);
  //   }
  //   else {
  //     const updatedList = item.filter((itm: any) => {
  //       return (
  //         itm.name.toLowerCase().search((text).toLowerCase()) !== -1
  //       );
  //     });
  //     setItem(updatedList);
  //   }


  //   //This will trigger a re-render


  // };




  // for Dropdown
//   const onItemChange = (event: React.FormEvent<HTMLDivElement>, option: any = {}, index?: number) => {

//     setSelectedItem(option.key);
//     setselectedKey(option.key)

//   };