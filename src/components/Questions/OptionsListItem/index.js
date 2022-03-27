import React, { useState } from "react";
import {Input} from 'reactstrap';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';


export default function OptionsListItem({ id, type, description, value, addOption, editOption, deleteOption, optionDisabled }) {
    const [optionDesc, setOptionDesc] = useState(description);
    const [optionPoints, setOptionPoints] = useState(value);
    const [isDisabled, setIsDisabled] = useState(optionDisabled);

    function validateOption() {
        let optiondesc = optionDesc === "" || optionDesc.trim() === "";
        let optionvalue = optionPoints === "" || optionPoints.trim() === "";
        return optiondesc || optionvalue;
    }

    function handleSubmit() {
        if (type === 'new') {
            addOption({
                id: id,
                description: optionDesc,
                value: optionPoints
            });
            setOptionDesc('');
            setOptionPoints('');
        } else {
            editOption({
                id: id,
                description: optionDesc,
                value: optionPoints
            });
            setIsDisabled(true);
        }
    }

    return (
        <div style={{p: '2px 4px', display: 'flex', flexGrow: 1, alignItems: 'center'}}>
            <FormControl sx={{ m: 1, width: '350px' }}>
                <Input
                    id="new-option-desc"
                    placeholder="Option Description"
                    value={optionDesc}
                    onChange={(e) => setOptionDesc(e.target.value)}
                    disabled={isDisabled}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '125px' }}>
                <Input
                    id="new-option-points"
                    placeholder="Option Points"
                    value={optionPoints}
                    onChange={(e) => setOptionPoints(e.target.value)}
                    disabled={isDisabled}
                />
            </FormControl>
            {
                (type === 'new' || (type === 'edit' && !isDisabled)) && 
                (<Box sx={{p: '0px 0px 0px 8px'}}>
                    <Button 
                        variant="contained"
                        type="submit"
                        className="ml-2"
                        onClick={handleSubmit}
                        disabled={validateOption()}
                    >
                        {type === 'new' ? 'Add' : 'Submit'}
                    </Button>  
                </Box>)
            }
            {
                type === 'edit' && isDisabled && 
                (<Box sx={{p: '0px 0px 0px 8px'}}>
                    <Button 
                        variant="contained"
                        type="submit"
                        className="ml-2"
                        onClick={() => setIsDisabled(false)}
                    >
                        Edit
                    </Button>  
                </Box>)
            }
            {
                type === 'edit' && isDisabled && 
                (<Box sx={{p: '0px 0px 0px 8px'}}>
                    <Button 
                        variant="contained"
                        type="submit"
                        className="ml-2"
                        onClick={() => deleteOption(id)}
                    >
                        Delete
                    </Button>  
                </Box>)
            }
        </div>
    );
}