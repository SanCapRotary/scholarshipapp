import React, { useState } from 'react';
import '../FormStyleSheet.css'

export interface GuardianEntry {
    guardianName: string;
    guardianRelationship: string;
    guardianAddress: string;
    guardianMobile: string;
    guardianEmail: string;
    guardianOccupation: string;
    guardianEmployer: string;
}

export interface SiblingEntry {
    siblingName: string;
    siblingAge: string;
    siblingInSchool: boolean;
    siblingSchoolName: string;
}

export const FamilyInformationForm: React.FC<{ onUpdate: (guardians: GuardianEntry[], siblings: SiblingEntry[]) => void }> = ({ onUpdate }) => {
    const [guardians, setGuardians] = useState<GuardianEntry[]>([
        { guardianName: '', guardianRelationship: '', guardianAddress: '', guardianMobile: '', guardianEmail: '', guardianOccupation: '', guardianEmployer: '' }
    ]);

    const [siblings, setSiblings] = useState<SiblingEntry[]>([
        { siblingName: '', siblingAge: '', siblingInSchool: false, siblingSchoolName: '' }
    ]);

    const handleGuardianChange = (index: number, field: keyof GuardianEntry, value: string) => {
        const updatedGuardians = guardians.map((entry, i) => (
            i === index ? { ...entry, [field]: value } : entry
        ));
        setGuardians(updatedGuardians);
        onUpdate(updatedGuardians, siblings);
    };

    const handleSiblingChange = (index: number, field: keyof SiblingEntry, value: string | boolean) => {
        const updatedSiblings = siblings.map((entry, i) => (
            i === index ? { ...entry, [field]: value } : entry
        ));
        setSiblings(updatedSiblings);
        onUpdate(guardians, updatedSiblings);
    };

    const addGuardianEntry = () => {
        setGuardians([...guardians, { guardianName: '', guardianRelationship: '', guardianAddress: '', guardianMobile: '', guardianEmail: '', guardianOccupation: '', guardianEmployer: '' }]);
    };

    const addSiblingEntry = () => {
        setSiblings([...siblings, { siblingName: '', siblingAge: '', siblingInSchool: false, siblingSchoolName: '' }]);
    };

    const removeGuardianEntry = (index: number) => {
        const updatedGuardians = guardians.filter((_, i) => i !== index);
        setGuardians(updatedGuardians);
        onUpdate(updatedGuardians, siblings);
    };

    const removeSiblingEntry = (index: number) => {
        const updatedSiblings = siblings.filter((_, i) => i !== index);
        setSiblings(updatedSiblings);
        onUpdate(guardians, updatedSiblings);
    };

    return (
        <>
            <div className="section-container">
                <h5>Guardians</h5>
                {guardians.map((entry, index) => (
                    <div key={index} className="sub-section-container">
                        <div className="inputs-container">
                            <div className="input-group">
                                <label>Guardian Name</label>
                                <input
                                    type="text"
                                    value={entry.guardianName}
                                    onChange={(e) => handleGuardianChange(index, 'guardianName', e.target.value)}
                                    placeholder="name"
                                />

                                <label>Relationship</label>
                                <input
                                    type="text"
                                    value={entry.guardianRelationship}
                                    onChange={(e) => handleGuardianChange(index, 'guardianRelationship', e.target.value)}
                                    placeholder="father / mother / legal guardian / etc."
                                />

                                <label>Address</label>
                                <input
                                    type="text"
                                    value={entry.guardianAddress}
                                    onChange={(e) => handleGuardianChange(index, 'guardianAddress', e.target.value)}
                                    placeholder="street / city / state / zip"
                                />

                                <label>Mobile</label>
                                <input
                                    type="text"
                                    value={entry.guardianMobile}
                                    onChange={(e) => handleGuardianChange(index, 'guardianMobile', e.target.value)}
                                    placeholder="000-555-1212"
                                />

                                <label>Email</label>
                                <input
                                    type="email"
                                    value={entry.guardianEmail}
                                    onChange={(e) => handleGuardianChange(index, 'guardianEmail', e.target.value)}
                                    placeholder="name@domain"
                                />

                                <label>Occupation</label>
                                <input
                                    type="text"
                                    value={entry.guardianOccupation}
                                    onChange={(e) => handleGuardianChange(index, 'guardianOccupation', e.target.value)}
                                    placeholder="occupation"
                                />

                                <label>Employer</label>
                                <input
                                    type="text"
                                    value={entry.guardianEmployer}
                                    onChange={(e) => handleGuardianChange(index, 'guardianEmployer', e.target.value)}
                                    placeholder="employer"
                                />
                            </div>
                            <button type="button" title="Remove entry" className="remove-x-button" onClick={() => removeGuardianEntry(index)}>X</button>
                        </div>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={addGuardianEntry}>Add Guardian</button>
            </div>

            <div className="section-container">
                <h5>Siblings</h5>
                {siblings.map((entry, index) => (
                    <div key={index} className="sub-section-container">
                        <div className="inputs-container">
                            <div className="input-group">
                                <label>Sibling Name</label>
                                <input
                                    type="text"
                                    value={entry.siblingName}
                                    onChange={(e) => handleSiblingChange(index, 'siblingName', e.target.value)}
                                    placeholder="sibling name"
                                />

                                <label>Sibling Age</label>
                                <input
                                    type="text"
                                    value={entry.siblingAge}
                                    onChange={(e) => handleSiblingChange(index, 'siblingAge', e.target.value)}
                                    placeholder="age"
                                />

                                <label>Sibling School Name</label>
                                <input
                                    type="text"
                                    value={entry.siblingSchoolName}
                                    onChange={(e) => handleSiblingChange(index, 'siblingSchoolName', e.target.value)}
                                    placeholder="[leave blank if not enrolled]"
                                />
                            </div>
                            <button type="button" title="Remove entry" className="remove-x-button" onClick={() => removeSiblingEntry(index)}>X</button>
                        </div>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={addSiblingEntry}>Add Sibling</button>
            </div>
        </>

    );

};

export default FamilyInformationForm;