import React, { useState } from 'react';

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
            <div>
                <h3>Guardians</h3>
                {guardians.map((entry, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={entry.guardianName}
                            onChange={(e) => handleGuardianChange(index, 'guardianName', e.target.value)}
                            placeholder="Guardian Name"
                        />
                        <input
                            type="text"
                            value={entry.guardianRelationship}
                            onChange={(e) => handleGuardianChange(index, 'guardianRelationship', e.target.value)}
                            placeholder="Guardian Relationship"
                        />
                        <input
                            type="text"
                            value={entry.guardianAddress}
                            onChange={(e) => handleGuardianChange(index, 'guardianAddress', e.target.value)}
                            placeholder="Guardian Address"
                        />
                        <input
                            type="text"
                            value={entry.guardianMobile}
                            onChange={(e) => handleGuardianChange(index, 'guardianMobile', e.target.value)}
                            placeholder="Guardian Mobile"
                        />
                        <input
                            type="email"
                            value={entry.guardianEmail}
                            onChange={(e) => handleGuardianChange(index, 'guardianEmail', e.target.value)}
                            placeholder="Guardian Email"
                        />
                        <input
                            type="text"
                            value={entry.guardianOccupation}
                            onChange={(e) => handleGuardianChange(index, 'guardianOccupation', e.target.value)}
                            placeholder="Guardian Occupation"
                        />
                        <input
                            type="text"
                            value={entry.guardianEmployer}
                            onChange={(e) => handleGuardianChange(index, 'guardianEmployer', e.target.value)}
                            placeholder="Guardian Employer"
                        />
                        <button onClick={() => removeGuardianEntry(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={addGuardianEntry}>Add Guardian</button>
            </div>

            <div>
                <h3>Siblings</h3>
                {siblings.map((entry, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={entry.siblingName}
                            onChange={(e) => handleSiblingChange(index, 'siblingName', e.target.value)}
                            placeholder="Sibling Name"
                        />
                        <input
                            type="text"
                            value={entry.siblingAge}
                            onChange={(e) => handleSiblingChange(index, 'siblingAge', e.target.value)}
                            placeholder="Sibling Age"
                        />
                        <label>
                            In School:
                            <input
                                type="checkbox"
                                checked={entry.siblingInSchool}
                                onChange={(e) => handleSiblingChange(index, 'siblingInSchool', e.target.checked)}
                            />
                        </label>
                        <input
                            type="text"
                            value={entry.siblingSchoolName}
                            onChange={(e) => handleSiblingChange(index, 'siblingSchoolName', e.target.value)}
                            placeholder="Sibling School Name"
                            disabled={!entry.siblingInSchool}
                        />
                        <button onClick={() => removeSiblingEntry(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={addSiblingEntry}>Add Sibling</button>
            </div>
        </>
    );

};

export default FamilyInformationForm;
