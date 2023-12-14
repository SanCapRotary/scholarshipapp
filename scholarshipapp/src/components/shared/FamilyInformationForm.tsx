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
                        {/* Repeat this pattern for other guardian fields */}
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
                        {/* Repeat this pattern for other sibling fields */}
                        <button onClick={() => removeSiblingEntry(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={addSiblingEntry}>Add Sibling</button>
            </div>
        </>
    );
};

export default FamilyInformationForm;
