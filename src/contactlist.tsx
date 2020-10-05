import React, { useState } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  DetailsHeader,
  DetailsList,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import axios from 'axios';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles, initializeIcons, ITextFieldStyles, Label, Link, mergeStyles, PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  DefaultButton,
  Modal,
  IDragOptions,
  IconButton,
  IIconProps,
} from 'office-ui-fabric-react';

export interface IDetailsListGroupedLargeExample {
  key?: any,
  name?: any,
  sno?: any,
  leadId?: any,
  phoneNumber?: any,
  user?: any
  type?: any,
  createdOn?: any,
  id?: any,
  uid?: any
}
export interface IDetailsListBasicExampleState extends IDetailsListGroupedLargeExample {
  items?: IDetailsListGroupedLargeExample[];
}

const DetailsLists = ({ items }: IDetailsListBasicExampleState) => {
  initializeIcons();
  const warn = console.warn;
  function logWarning(...warnings: any) {
    let showWarning = true;
    warnings.forEach((warning: any) => {
      if (warning.includes("UNSAFE_")) showWarning = false;
      else if (warning.includes("SourceMap")) showWarning = false;
      else if (warning.includes("DevTools")) showWarning = false;
    });
    if (showWarning) warn(...warnings);
  }


  console.warn = logWarning;
  const [item, setItem] = useState<any>([]);
  const [allitem, setAllItem] = useState<any>([]);
  const [search, searchItem] = useState<any>('');
  let _columns: IColumn[];
  let _allItems: IDetailsListGroupedLargeExample[];
  const options = [
    { key: '15', text: '15' },
    { key: '25', text: '25' },
    { key: '50', text: '50' },
    { key: '100', text: '100' },

  ];
  let dropdownoptions: IDropdownOption[];
  const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };
  // Dropdown
  const [selectedKey, setselectedKey] = useState<any>("15");
  const [selecteduserKey, setuserselectedKey] = useState<any>('');
  const [defaultuser, setDefaultUser] = useState<any>('');
  const [selectedText, setselectedText] = useState<any>("15")
  const [selectedItem, setSelectedItem] = useState<any>();
  const [startlength, setstartlength] = useState<any>('0');
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const [name, setName] = useState<any>('');
  const [currentuser, setCurrentUser] = useState<any>('');
  const [notes, setNotes] = useState<any>('');
  const [id, setId] = useState<any>('');
  const [ddOptions, setDDOptions] = useState<any>([]);
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 61 },
  };
  const dropdownStyles1: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };
  debugger;
  React.useEffect(() => {
    onLoad(startlength, selectedKey, '');
    dropDown();
  }, [])

  //Starting function
  function onLoad(start?: any, length?: any, search?: any) {
    debugger;
    _allItems = [];
    const url = `https://apiuat.actingoffice.com/Contacts?start=${start}&length=${length}&search=${search}`
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    debugger
    axios
      .get(url, { headers })
      .then((res) => {
        debugger;
        console.log(res);
        if (res.data.status == true) {
          for (let i = 0; i < res.data.result.items.length; i++) {

            _allItems.push({
              key: i,
              sno: res.data.result.items[i].sno,
              name: res.data.result.items[i].name,
              leadId: res.data.result.items[i]?.leadId,
              phoneNumber: res.data.result.items[i].phoneNumber?.number,
              user: res.data.result.items[i].leadDetails?.user?.name,
              type: res.data.result.items[i].type,
              createdOn: res.data.result.items[i].createdOn,
              id: res.data.result.items[i].id,
              uid: res.data.result.items[i].leadDetails?.user?.id
            });
            setItem(_allItems);
            setAllItem(_allItems);


          }

        }
      })
  }
  const theme = getTheme();
  const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'row wrap',

    },
    header: [

      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        fontWeight: FontWeights.light,
        padding: '12px 12px 14px 24px',
      },
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  });

  const titleId = useId('title');
  const cancelIcon: IIconProps = { iconName: 'Cancel' };
  const toggleStyles = { root: { marginBottom: '20px' } };
  const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };
  const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
  };

  const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
  });

  _columns = [
    { key: 'col1', name: 'sno', fieldName: 'sno', minWidth: 100, maxWidth: 200 },
    { key: 'col2', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
    { key: 'col3', name: 'leadId', fieldName: 'leadId', minWidth: 100, maxWidth: 200 },
    { key: 'col4', name: 'phoneNumber', fieldName: 'phoneNumber', minWidth: 100, maxWidth: 200 },
    { key: 'col5', name: 'First Response', fieldName: 'user', minWidth: 100, maxWidth: 200 },
    { key: 'col6', name: 'type', fieldName: 'type', minWidth: 100, maxWidth: 200 },
    { key: 'col7', name: 'createdOn', fieldName: 'createdOn', minWidth: 100, maxWidth: 200 },
    // { key: 'col8', name: 'id', fieldName: 'id', minWidth: 100, maxWidth: 200 ,hi},
  ]

  const _onRenderItemColumn = (item: IDetailsListGroupedLargeExample, index?: any, _columns?: IColumn) => {

    const key = _columns?.fieldName as keyof IDetailsListGroupedLargeExample;
    if (key === 'user') {
      return <Link data-selection-invoke={true}>{item[key]}</Link>;
    }
    if (item[key] == undefined) {
      item[key] = "";

    }
    return String(item[key]);
  };
  function dropDown() {
    dropdownoptions = [];
    const url = `https://apiuat.actingoffice.com/Practice/Config`
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    debugger
    axios
      .get(url, { headers })
      .then((res) => {
        debugger;
        console.log(res);
        if (res.data.status == true) {
          for (let i = 0; i < res.data.result.users.length; i++) {
            dropdownoptions.push({
              key: res.data.result.users[i].id,
              text: res.data.result.users[i].name,
            });
            setDDOptions(dropdownoptions)
          }
        }
      })
  }

  function PopUp(item: IDetailsListGroupedLargeExample) {
    debugger;
    showModal();
    setName(item.name);
    setCurrentUser(item.user);
    setId(item.id);


  }
  function changeResponse() {
    debugger;
    const url = `https://apiuat.actingoffice.com/Contacts/${id}/SalesUser`
    const userObject = {
      userId: selecteduserKey,
      notes: notes,
      ids: [id]
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    axios.post(url, userObject, { headers }).then((res) => {
      if (res.data.status == true) {
        console.log(res);
        hideModal();
        onLoad(startlength, selectedKey, '');
      }
    }
    );
  }


  return (<>
    <TextField
      className={exampleChildClass}
      label="Filter by name:"

      styles={textFieldStyles}
      value={search} onChange={(e, v) => {
        searchItem(v || "");
        onLoad(startlength, selectedKey, search)
      }}
    />
    <DetailsList
      onItemInvoked={PopUp}
      items={item}
      onRenderItemColumn={_onRenderItemColumn}
      columns={_columns}
      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      ariaLabelForSelectionColumn="Toggle selection"
      checkButtonAriaLabel="Row checkbox"

    />
    <Modal
      titleAriaId={titleId}
      isOpen={isModalOpen}
      onDismiss={hideModal}
      isBlocking={false}
      containerClassName={contentStyles.container}
      dragOptions={isDraggable ? dragOptions : undefined}
    >
      <div className={contentStyles.header}>
        <span id={titleId}>Change User/ First Response</span>
        <IconButton
          styles={iconButtonStyles}
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={hideModal}
        />
      </div>
      <div className={contentStyles.body}>
        <label>Name</label>
        <TextField
          className={exampleChildClass}
          styles={textFieldStyles}
          value={name}
          disabled
        />
        <label>Current</label>
        <TextField
          className={exampleChildClass}
          styles={textFieldStyles}
          value={currentuser}
          disabled
        />
        <label>User</label>
        <Dropdown
          selectedKey={ddOptions ? ddOptions.key : undefined}
          placeholder="Select an option"
          options={ddOptions}
          styles={dropdownStyles1}
          onChange={(e, option: any = {}) => {
            setuserselectedKey(option.key)
          }}
        />
        <label>Notes</label>
        <TextField multiline value={notes} onChange={(e, v) => {
          setNotes(v || '')
        }} />
        <PrimaryButton text="Submit" style={{ marginTop: 20 }} onClick={changeResponse} allowDisabledFocus />
      </div>
    </Modal>


    <Stack className="modalclass1">
      <Label >Show</Label>
      <Dropdown
        defaultSelectedKey={selectedKey}
        options={options}
        selectedKey={selectedItem ? selectedItem.key : undefined}
        onChange={(e, option: any = {}) => {
          onLoad(startlength, option.key, '');
          setselectedKey(option.key)
        }}
        styles={dropdownStyles}
      />
      <Label>Items</Label>
    </Stack>
  </>
  );


}
export default DetailsLists;